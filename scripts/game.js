const gifCarga = document.querySelectorAll('.gif-carga');

const dispositivoMovil = esDispositivoMovil();

const anchoPantalla = window.innerWidth;
const altoPantalla = window.innerHeight * 1.1;

const velocidadX = anchoPantalla / 4.5;
const velocidadY = altoPantalla / 1.15;

const nivelGravedad = velocidadY * 2;

let config = {
    type: Phaser.AUTO,
    width: anchoPantalla,
    height: altoPantalla,
    backgroundColor: 0x8585FF,
    parent: 'game',
    preserveDrawingBuffer: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: nivelGravedad },
            debug: true
        }
    },
    scene: {
        key: 'level-1',
        preload: preload,
        create: create,
        update: update
    },
    version: '0.7.3'
};

const anchoMundo = anchoPantalla * 11;
const altoPlataforma = altoPantalla / 5;

const inicioDesplazamiento = anchoPantalla / 2.5;

const plataformaPiezas = 100;
const anchoPlataformaPiezas = (anchoMundo - anchoPantalla) / plataformaPiezas;

let esNivelMundo;

let coordenadasAgujerosMundo = [];

let listaBloquesVacios = [];

let jugador;
let controlesJugador;
let estadoJugador = 0;
let invulnerabilidadJugador = false;
let bloqueoJugador = false;
let disparoJugador = false;
let enfriamientoDisparo = false;
let distanciaLejanaJugador = 0;

let banderaConseguida = false;

let teclasControles = {
    JUMP: null,
    DOWN: null,
    LEFT: null,
    RIGHT: null,
    FIRE: null,
    PAUSE: null
};

let puntuacion = 0;
let tiempoRestante = 300;

let nivelIniciado = false;
let nivelFinalizado = false;

let controlesSuaves;
let derrota = false;
let victoria = false;

let game = new Phaser.Game(config);

function esDispositivoMovil() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let controlHorizontalSuavizado = new Phaser.Class({

    initialize:

        function controlHorizontalSuavizado(speed) {
            this.msSpeed = speed;
            this.value = 0;
        },

    moverIzquierda: function(delta) {
        if (this.value > 0) { this.reset(); }
        this.value -= this.msSpeed * 3.5;
        if (this.value < -1) { this.value = -1; }
        controlesJugador.time.rightDown += delta;
    },

    moverDerecha: function(delta) {
        if (this.value < 0) { this.reset(); }
        this.value += this.msSpeed * 3.5;
        if (this.value > 1) { this.value = 1; }
        controlesJugador.time.leftDown += delta;
    },

    reset: function() {
        this.value = 0;
    }
});

function preload() {

    let cajaProgreso = this.add.graphics();
    let barraProgreso = this.add.graphics();
    cajaProgreso.fillStyle(0x222222, 1);
    cajaProgreso.fillRoundedRect(anchoPantalla / 2.48, altoPantalla / 2 * 1.05, anchoPantalla / 5.3, altoPantalla / 20.7, 10);

    let ancho = this.cameras.main.width;
    let alto = this.cameras.main.height;

    let textoPorcentaje = this.make.text({
        x: ancho / 2,
        y: alto / 2 * 1.25,
        text: '0%',
        style: {
            font: anchoPantalla / 96 + 'px pixel_nums',
            fill: '#ffffff'
        }
    });
    textoPorcentaje.setOrigin(0.5, 0.5);

    this.load.on('progress', function (valor) {
        textoPorcentaje.setText(valor * 99 >= 99 ? 'Generando el mundo...' : 'Cargando... ' + parseInt(valor * 99) + '%');
        barraProgreso.clear();
        barraProgreso.fillStyle(0xffffff, 1);
        barraProgreso.fillRoundedRect(anchoPantalla / 2.45, altoPantalla / 2 * 1.07, anchoPantalla / 5.6 * valor, altoPantalla / 34.5, 5);
    });

    this.load.on('complete', function () {
        barraProgreso.destroy();
        cajaProgreso.destroy();
        textoPorcentaje.destroy();
        gifCarga.forEach(gif => {gif.style.display = 'none';});
    });

    // Load Fonts
    this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

    // Load plugins
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    this.load.plugin('rexcheckboxplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcheckboxplugin.min.js', true);
    this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);
    this.load.plugin('rexkawaseblurpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkawaseblurpipelineplugin.min.js', true);

    esNivelMundo = Phaser.Math.Between(0, 100) <= 84;

    let estiloMundo = esNivelMundo ? 'overworld' : 'underground';

    // Load entities sprites
    this.load.spritesheet('mario', 'assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
    this.load.spritesheet('mario-grande', 'assets/entities/mario-grown.png', { frameWidth: 18, frameHeight: 32 });
    this.load.spritesheet('mario-fuego', 'assets/entities/mario-fire.png', { frameWidth: 18, frameHeight: 32 });
    this.load.spritesheet('seta', 'assets/entities/' + estiloMundo + '/goomba.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('tortuga', 'assets/entities/koopa.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('caparazon', 'assets/entities/shell.png', { frameWidth: 16, frameHeight: 15 });

    // Load objects sprites
    this.load.spritesheet('bola-fuego', 'assets/entities/fireball.png', { frameWidth: 8, frameHeight: 8 });
    this.load.spritesheet('explosion-bola-fuego', 'assets/entities/fireball-explosion.png', { frameWidth: 16, frameHeight: 16 });

    // Load props
    this.load.image('nube1', 'assets/scenery/overworld/cloud1.png');
    this.load.image('nube2', 'assets/scenery/overworld/cloud2.png');
    this.load.image('montania1', 'assets/scenery/overworld/mountain1.png');
    this.load.image('montania2', 'assets/scenery/overworld/mountain2.png');
    this.load.image('valla', 'assets/scenery/overworld/fence.png');
    this.load.image('arbusto1', 'assets/scenery/overworld/bush1.png');
    this.load.image('arbusto2', 'assets/scenery/overworld/bush2.png');
    this.load.image('castillo', 'assets/scenery/castle.png');
    this.load.image('mastil-bandera', 'assets/scenery/flag-mast.png');
    this.load.image('bandera-final', 'assets/scenery/final-flag.png');
    this.load.image('senial', 'assets/scenery/sign.png');

    // Load tubes
    this.load.image('tubo-horizontal', 'assets/scenery/horizontal-tube.png');
    this.load.image('tubo-horizontal-final', 'assets/scenery/horizontal-final-tube.png');
    this.load.image('tubo-vertical-extralargo', 'assets/scenery/vertical-large-tube.png');
    this.load.image('tubo-vertical-pequenio', 'assets/scenery/vertical-small-tube.png');
    this.load.image('tubo-vertical-mediano', 'assets/scenery/vertical-medium-tube.png');
    this.load.image('tubo-vertical-largo', 'assets/scenery/vertical-large-tube.png');


    // Load HUD images
    this.load.image('ajustes', 'assets/hud/gear.png');
    this.load.image('bocata-ajustes', 'assets/hud/settings-bubble.png');

    this.load.spritesheet('npc', 'assets/hud/npc.png', { frameWidth: 16, frameHeight: 24 });

    // Load platform bricks and structures
    this.load.image('ladrillos', 'assets/scenery/' + estiloMundo + '/floorbricks.png');
    this.load.image('labrillos-inicio', 'assets/scenery/overworld/floorbricks.png');
    this.load.image('bloque', 'assets/blocks/' + estiloMundo + '/block.png');
    this.load.image('bloque2', 'assets/blocks/underground/block2.png');
    this.load.image('bloque-vacio', 'assets/blocks/' + estiloMundo + '/emptyBlock.png');
    this.load.image('bloque-inmovil', 'assets/blocks/' + estiloMundo + '/immovableBlock.png');
    this.load.spritesheet('escombros', 'assets/blocks/' + estiloMundo + '/brick-debris.png', { frameWidth: 8, frameHeight: 8 });
    this.load.spritesheet('bloque-misterioso', 'assets/blocks/' + estiloMundo + '/misteryBlock.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('bloque-personalizado', 'assets/blocks/overworld/customBlock.png', { frameWidth: 16, frameHeight: 16 });

    // Load collectibles
    this.load.spritesheet('moneda', 'assets/collectibles/coin.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('moneda-suelo', 'assets/collectibles/underground/ground-coin.png', { frameWidth: 10, frameHeight: 14 });
    this.load.spritesheet('flor-fuego', 'assets/collectibles/' + estiloMundo + '/fire-flower.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('seta-vida', 'assets/collectibles/live-mushroom.png');
    this.load.image('super-seta', 'assets/collectibles/super-mushroom.png');


    // Load sounds and music
    this.load.audio('principal', 'assets/sound/music/overworld/theme.mp3');
    this.load.audio('subsuelo', 'assets/sound/music/underground/theme.mp3');
    this.load.audio('rapida', 'assets/sound/music/' + estiloMundo +'/hurry-up-theme.mp3');
    this.load.audio('derrota', 'assets/sound/music/gameover.mp3');
    this.load.audio('victoria', 'assets/sound/music/win.wav');
    this.load.audio('salto', 'assets/sound/effects/jump.mp3');
    this.load.audio('moneda', 'assets/sound/effects/coin.mp3');
    this.load.audio('aparicion-poder', 'assets/sound/effects/powerup-appears.mp3');
    this.load.audio('consumir-poder', 'assets/sound/effects/consume-powerup.mp3');
    this.load.audio('poder-abajo', 'assets/sound/effects/powerdown.mp3');
    this.load.audio('seta-pisada', 'assets/sound/effects/goomba-stomp.wav');
    this.load.audio('levantar-bandera', 'assets/sound/effects/flagpole.mp3');
    this.load.audio('bola-fuego', 'assets/sound/effects/fireball.mp3');
    this.load.audio('golpe', 'assets/sound/effects/kick.mp3');
    this.load.audio('advertencia-tiempo', 'assets/sound/effects/time-warning.mp3');
    this.load.audio('here-we-go', Phaser.Math.Between(0, 100) < 98 ? 'assets/sound/effects/here-we-go.mp3' : 'assets/sound/effects/cursed-here-we-go.mp3');
    this.load.audio('sonido-pausa', 'assets/sound/effects/pause.wav');
    this.load.audio('golpe-bloque', 'assets/sound/effects/block-bump.wav');
    this.load.audio('bloque-roto', 'assets/sound/effects/break-block.wav');
}

function iniciarSonidos() {
    this.grupoMusica = this.add.group();
    this.grupoEfectos = this.add.group();

    this.temaPrincipal = this.sound.add('principal', { volume: 0.15 });
    this.temaPrincipal.play({ loop: -1 });
    this.grupoMusica.add(this.temaPrincipal);

    this.temaSubsuelo = this.sound.add('subsuelo', { volume: 0.15 });
    this.grupoMusica.add(this.temaSubsuelo);

    this.temaRapido = this.sound.add('rapida', { volume: 0.15 });
    this.grupoMusica.add(this.temaRapido);

    this.temaDerrota = this.sound.add('derrota', { volume: 0.3 });
    this.grupoMusica.add(this.temaDerrota);

    this.temaVictoria = this.sound.add('victoria', { volume: 0.3 });
    this.grupoMusica.add(this.temaVictoria);

    this.efectoSalto = this.sound.add('salto', { volume: 0.10 });
    this.grupoEfectos.add(this.efectoSalto);

    this.efectoMoneda = this.sound.add('moneda', { volume: 0.2 });
    this.grupoEfectos.add(this.efectoMoneda);

    this.efectoAparicionPoder = this.sound.add('aparicion-poder', { volume: 0.2 });
    this.grupoEfectos.add(this.efectoAparicionPoder);

    this.efectoConsumirPoder = this.sound.add('consumir-poder', { volume: 0.2 });
    this.grupoEfectos.add(this.efectoConsumirPoder);

    this.efectoBajarPoder = this.sound.add('poder-abajo', { volume: 0.3 });
    this.grupoEfectos.add(this.efectoBajarPoder);

    this.efectoSetaPisada = this.sound.add('seta-pisada', { volume: 1 });
    this.grupoEfectos.add(this.efectoSetaPisada);

    this.efectoBanderaLevantada = this.sound.add('levantar-bandera', { volume: 0.3 });
    this.grupoEfectos.add(this.efectoBanderaLevantada);

    this.efectoBolaFuego = this.sound.add('bola-fuego', { volume: 0.3 });
    this.grupoEfectos.add(this.efectoBolaFuego);

    this.efectoGolpe = this.sound.add('golpe', { volume: 0.3 });
    this.grupoEfectos.add(this.efectoGolpe);

    this.efectoAdvertenciaTiempo = this.sound.add('advertencia-tiempo', { volume: 0.2 });
    this.grupoEfectos.add(this.efectoAdvertenciaTiempo);

    this.efectoHereWeGo = this.sound.add('here-we-go', { volume: 0.17 });
    this.grupoEfectos.add(this.efectoHereWeGo);

    this.efectoPausa = this.sound.add('sonido-pausa', { volume: 0.17 });
    this.grupoEfectos.add(this.efectoPausa);

    this.efectoGolpeBloque = this.sound.add('golpe-bloque', { volume: 0.3 });
    this.grupoEfectos.add(this.efectoGolpeBloque);

    this.efectoGolpeRoto = this.sound.add('bloque-roto', { volume: 0.5 });
    this.grupoEfectos.add(this.efectoGolpeRoto);
}

function create() {
    controlesJugador = {
        time: {
            leftDown: 0,
            rightDown: 0
        },
        direction: {
            positive: true
        },
        speed: {
            run: velocidadX,
        }
    };

    this.physics.world.setBounds(0, 0, anchoMundo, altoPantalla);

    // Create camera
    this.cameras.main.setBounds(0, 0, anchoMundo, altoPantalla);
    this.cameras.main.isFollowing = false;
    //this.cameras.main.followOffset.set(inicioDesplazamiento / 6, 0);

    iniciarSonidos.call(this);

    crearAnimaciones.call(this);
    crearJugador.call(this);
    generarNivel.call(this);
    dibujarMundo.call(this);
    dibujarPantallaPrincipal.call(this);
    createGoombas.call(this);
    crearControles.call(this);
    applySettings.call(this);

    controlesSuaves = new controlHorizontalSuavizado(0.001);
}

function crearControles() {

    this.mando = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: anchoPantalla * 0.118,
        y: altoPantalla / 1.68,
        radius: dispositivoMovil ? 100 : 0,
        base: this.add.circle(0, 0, dispositivoMovil ? 75 : 0, 0x0000000, 0.05),
        thumb: this.add.circle(0, 0, dispositivoMovil ? 25 : 0, 0xcccccc, 0.2),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
    });

    // Set control keys

    const nombreTeclas = ['JUMP', 'DOWN', 'LEFT', 'RIGHT', 'FIRE', 'PAUSE'];
    const codigosPredefinidos = [Phaser.Input.Keyboard.KeyCodes.SPACE, Phaser.Input.Keyboard.KeyCodes.S, Phaser.Input.Keyboard.KeyCodes.A, Phaser.Input.Keyboard.KeyCodes.D, Phaser.Input.Keyboard.KeyCodes.Q, Phaser.Input.Keyboard.KeyCodes.ESC];

    nombreTeclas.forEach((keyName, i) => {
        const keyCode = localStorage.getItem(keyName) ? Number(localStorage.getItem(keyName)) : codigosPredefinidos[i];
        teclasControles[keyName] = this.input.keyboard.addKey(keyCode);
    });
}

function generarCoordenadasAleatorias(entidad = false, tierra = true) {
    const startPos = entidad ? anchoPantalla * 1.5 : anchoPantalla;
    const endPos = entidad ? anchoMundo - anchoPantalla * 3 : anchoMundo;

    let coordinate = Phaser.Math.Between(startPos, endPos);

    if (!tierra) return coordinate;

    for (let agujero of coordenadasAgujerosMundo) {
        if (coordinate >= agujero.start - anchoPlataformaPiezas * 1.5 && coordinate <= agujero.end) {
            return generarCoordenadasAleatorias.call(this, entidad, tierra);
        }
    }

    return coordinate;
}

function dibujarMundo() {
    //Drawing scenery props

    //> Drawing the Sky
    this.add.rectangle(anchoPantalla, 0,anchoMundo, altoPantalla, esNivelMundo ? 0x8585FF : 0x000000)
        .setOrigin(0)
        .depth = -1;

    let propsY = altoPantalla - altoPlataforma;

    if (esNivelMundo) {
        for (let i = 0; i < Phaser.Math.Between(Math.trunc(anchoMundo / 760), Math.trunc(anchoMundo / 380)); i++) {
            let x = generarCoordenadasAleatorias(false, false);
            let y = Phaser.Math.Between(altoPantalla / 80, altoPantalla / 2.2);
            if (Phaser.Math.Between(0, 10) < 5) {
                this.add.image(x, y, 'nube1')
                    .setScale(altoPantalla / 1725)
                    .setOrigin(0);
            } else {
                this.add.image(x, y, 'nube2')
                    .setScale(altoPantalla / 1725)
                    .setOrigin(0);
            }
        }

        for (let i = 0; i < Phaser.Math.Between(anchoMundo / 6400, anchoMundo / 3800); i++) {
            let x = generarCoordenadasAleatorias();

            if (Phaser.Math.Between(0, 10) < 5) {
                this.add.image(x, propsY, 'montania1')
                    .setScale(altoPantalla / 517)
                    .setOrigin(0, 1);
            } else {
                this.add.image(x, propsY, 'montania2')
                    .setScale(altoPantalla / 517)
                    .setOrigin(0, 1);
            }
        }

        for (let i = 0; i < Phaser.Math.Between(Math.trunc(anchoMundo / 960), Math.trunc(anchoMundo / 760)); i++) {
            let x = generarCoordenadasAleatorias();

            if (Phaser.Math.Between(0, 10) < 5) {
                this.add.image(x, propsY, 'arbusto1')
                    .setOrigin(0, 1)
                    .setScale(altoPantalla / 609);
            } else {
                this.add.image(x, propsY, 'arbusto2')
                    .setOrigin(0, 1)
                    .setScale(altoPantalla / 609);
            }
        }

        for (let i = 0; i < Phaser.Math.Between(Math.trunc(anchoMundo / 4000), Math.trunc(anchoMundo / 2000)); i++) {
            let x = generarCoordenadasAleatorias();

            this.add.tileSprite(x, propsY, Phaser.Math.Between(100, 250), 35, 'valla')
                .setOrigin(0, 1)
                .setScale(altoPantalla / 863);
        }
    }

    //> Final flag
    this.mastilBanderaFinal = this.add.tileSprite(anchoMundo - (anchoMundo / 30), propsY, 16, 167, 'mastil-bandera')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 400);
    this.physics.add.existing(this.mastilBanderaFinal);
    this.mastilBanderaFinal.immovable = true;
    this.mastilBanderaFinal.allowGravity = false;
    this.mastilBanderaFinal.body.setSize(3, 167);
    this.physics.add.overlap(jugador, this.mastilBanderaFinal, null, conseguirBandera, this);
    this.physics.add.collider(this.grupoPlataformas.getChildren(), this.mastilBanderaFinal);

    //> Flag
    this.banderaFinal = this.add.image(anchoMundo - (anchoMundo / 30), propsY * 0.93, 'bandera-final')
        .setOrigin(0.5, 1);
    this.banderaFinal.setScale(altoPantalla / 400);

    //> Castle
    this.add.image(anchoMundo - (anchoMundo / 75), propsY, 'castillo')
        .setOrigin(0.5, 1)
        .setScale(altoPantalla / 300);
}

function generarNivel() {
    let piezaInicio = anchoPantalla;
    let ultimoAgujeroEn = 0;
    let ultimaEstructuraEn = 0;

    this.grupoPlataformas = this.add.group();
    this.grupoProteccionCaidas = this.add.group();
    this.grupoBloques = this.add.group();
    this.grupoBloquesConstruccion = this.add.group();
    this.grupoBloquesMisteriosos = this.add.group();
    this.grupoBloquesInmoviles = this.add.group();
    this.grupoMonedasSuelo = this.add.group();

    if (!esNivelMundo) {
        this.grupoBloques.add(this.add.tileSprite(anchoPantalla, altoPantalla - altoPlataforma / 1.2, 16, altoPantalla - altoPlataforma, 'bloque2')
            .setScale(altoPantalla / 345)
            .setOrigin(0, 1));
        this.techoSubsuelo = this.add.tileSprite(anchoPantalla * 1.2, altoPantalla / 13, anchoMundo / 2.68, 16, 'bloque2')
            .setScale(altoPantalla / 345)
            .setOrigin(0);
        this.grupoBloques.add(this.techoSubsuelo);
    }

    for (let i=0; i <= plataformaPiezas; i++) {
        let numero = Phaser.Math.Between(0, 100);

        if (piezaInicio >= (ultimoAgujeroEn > 0 || ultimaEstructuraEn > 0 || anchoMundo - anchoPlataformaPiezas * 4) || numero <= 0 || piezaInicio <= anchoPantalla * 2 || piezaInicio >= anchoMundo - anchoPantalla * 2) {
            ultimoAgujeroEn--;

            //> Create platform
            let numeroPiezas = this.add.tileSprite(piezaInicio, altoPantalla, anchoPlataformaPiezas, altoPlataforma, 'ladrillos')
                .setScale(2)
                .setOrigin(0, 0.5);
            this.physics.add.existing(numeroPiezas);
            numeroPiezas.body.immovable = true;
            numeroPiezas.body.allowGravity = false;
            numeroPiezas.isPlatform = true;
            numeroPiezas.depth = 2;
            this.grupoPlataformas.add(numeroPiezas);
            // Apply jugador collision with platform
            this.physics.add.collider(jugador, numeroPiezas);

            //> Creating world structures

            if (!(piezaInicio >= (anchoMundo - anchoPantalla * (esNivelMundo ? 1 : 1.5))) && piezaInicio > (anchoPantalla + anchoPlataformaPiezas * 2) && ultimoAgujeroEn < 1 && ultimaEstructuraEn < 1) ultimaEstructuraEn = generateStructure.call(this, piezaInicio);
            else ultimaEstructuraEn--;
            
        } else {
            // Save every hole start and end for later use
            coordenadasAgujerosMundo.push({ 
                start: piezaInicio,
                end: piezaInicio + anchoPlataformaPiezas * 2
            });
            ultimoAgujeroEn = 2;
            this.grupoProteccionCaidas.add(this.add.rectangle(piezaInicio + anchoPlataformaPiezas * 2, altoPantalla - altoPlataforma, 5, 5)
                .setOrigin(0, 1));
            this.grupoProteccionCaidas.add(this.add.rectangle(piezaInicio, altoPantalla - altoPlataforma, 5, 5)
                .setOrigin(1, 1));
        }
        piezaInicio += anchoPlataformaPiezas * 2;
    }

    this.triggerPantallaInicio = this.add.tileSprite(anchoPantalla, altoPantalla - altoPlataforma, 32, 28, 'tubo-horizontal')
        .setScale(altoPantalla / 345)
        .setOrigin(1, 1);
    this.triggerPantallaInicio.depth = 4;
    this.physics.add.existing(this.triggerPantallaInicio);
    this.triggerPantallaInicio.body.immovable = true;
    this.triggerPantallaInicio.body.allowGravity = false;
    this.physics.add.collider(jugador, this.triggerPantallaInicio, inicioNivel, null, this);

    let muroInvisible2 = this.add.rectangle(anchoPantalla, altoPantalla - altoPlataforma, 1, altoPantalla)
        .setOrigin(0.5, 1);
    this.physics.add.existing(muroInvisible2);
    muroInvisible2.body.immovable = true;
    muroInvisible2.body.allowGravity = false;
    this.physics.add.collider(jugador, muroInvisible2);
    this.grupoProteccionCaidas.add(muroInvisible2);

    if (!esNivelMundo) {
        this.tuboVertical = this.add.tileSprite(anchoMundo - anchoPantalla, altoPantalla - altoPlataforma, 32, altoPantalla, 'tubo-vertical-extralargo')
            .setScale(altoPantalla / 345)
            .setOrigin(1, 1);
        this.tuboVertical.depth = 2;
        this.physics.add.existing(this.tuboVertical);
        this.tuboVertical.body.immovable = true;
        this.tuboVertical.body.allowGravity = false;
        this.physics.add.collider(jugador, this.tuboVertical);

        this.triggerFinal = this.add.tileSprite(anchoMundo - anchoPantalla * 1.03, altoPantalla - altoPlataforma, 40, 31, 'tubo-horizontal-final')
            .setScale(altoPantalla / 345)
            .setOrigin(1, 1);
        this.triggerFinal.depth = 2;
        this.physics.add.existing(this.triggerFinal);
        this.triggerFinal.body.immovable = true;
        this.triggerFinal.body.allowGravity = false;
        this.physics.add.collider(jugador, this.triggerFinal, transportarAFinalNivel, null, this);

        let muroInvisible1 = this.add.rectangle(anchoMundo - anchoPantalla, altoPantalla - altoPlataforma, 1, altoPantalla)
            .setOrigin(0.5, 1);
        this.physics.add.existing(muroInvisible1);
        muroInvisible1.body.immovable = true;
        muroInvisible1.body.allowGravity = false;
        this.physics.add.collider(jugador, muroInvisible1);
        this.grupoProteccionCaidas.add(muroInvisible1);
    }

    let proteccionesCaidas = this.grupoProteccionCaidas.getChildren();
    proteccionesCaidas.forEach(proteccionCaida => {
        this.physics.add.existing(proteccionCaida);
        proteccionCaida.body.immovable = true;
        proteccionCaida.body.allowGravity = false;
    });

    // Stablish properties for every generated structure
    let bloquesMisteriosos = this.grupoBloquesMisteriosos.getChildren();
    bloquesMisteriosos.forEach(bloqueMisterioso => {
        this.physics.add.existing(bloqueMisterioso);
        bloqueMisterioso.body.immovable = true;
        bloqueMisterioso.body.allowGravity = false;
        bloqueMisterioso.depth = 2;
        bloqueMisterioso.anims.play('bloque-misterioso', true);
        this.physics.add.collider(jugador, bloqueMisterioso, mostrarBloqueOculto, null, this);
    });

    let bloques = this.grupoBloques.getChildren();
    bloques.forEach(bloque => {
        this.physics.add.existing(bloque);
        bloque.body.immovable = true;
        bloque.body.allowGravity = false;
        bloque.depth = 2;
        this.physics.add.collider(jugador, bloque, destruirBloque, null, this);
    });

    // Apply jugador collision with immovable bloques
    let bloquesContruccion = this.grupoBloquesConstruccion.getChildren();
    bloquesContruccion.forEach(bloqueContruccion => {
        this.physics.add.existing(bloqueContruccion);
        bloqueContruccion.isImmovable = true;
        bloqueContruccion.body.immovable = true;
        bloqueContruccion.body.allowGravity = false;
        bloqueContruccion.depth = 2;
        this.physics.add.collider(jugador, bloqueContruccion, destruirBloque, null, this);
    });

    // Apply jugador collision with immovable bloques
    let bloquesInmoviles = this.grupoBloquesInmoviles.getChildren();
    bloquesInmoviles.forEach(bloqueInmovil => {
        this.physics.add.existing(bloqueInmovil);
        bloqueInmovil.body.immovable = true;
        bloqueInmovil.body.allowGravity = false;
        bloqueInmovil.depth = 2;
        this.physics.add.collider(jugador, bloqueInmovil);
    });

    let monedasSuelo = this.grupoMonedasSuelo.getChildren();
    monedasSuelo.forEach(monedaSuelo => {
        this.physics.add.existing(monedaSuelo);
        monedaSuelo.anims.play('moneda-suelo', true);
        monedaSuelo.body.allowGravity = false;
        monedaSuelo.body.immovable = true;
        monedaSuelo.depth = 2;
        this.physics.add.overlap(jugador, monedaSuelo, recogerMoneda, null, this);
    });
}

function inicioNivel(jugador, trigger) {

    if (!jugador.body.blocked.right && !trigger.body.blocked.left)
        return;

    this.efectoBajarPoder.play();

    this.physics.world.setBounds(anchoPantalla, 0, anchoMundo, altoPantalla);

    aplicarInvulnerabilidadJugador.call(this, 4000);

    bloqueoJugador = true;

    jugador.setVelocityX(5);
    jugador.anims.play('andando', true).flipX = false;

    this.cameras.main.fadeOut(900, 0, 0, 0);

    this.efectoHereWeGo.play();

    setTimeout(() => {
        if (!esNivelMundo) {
            jugador.y = altoPantalla / 5;
            this.temaPrincipal.stop();
            this.temaSubsuelo.play({ loop: -1 });
        }

        jugador.x = anchoPantalla * 1.1;
        this.cameras.main.pan(anchoPantalla * 1.5, 0, 0);
        bloqueoJugador = false;
        this.cameras.main.fadeIn(500, 0, 0, 0);
        createHUD.call(this);
        actualizarTiempo.call(this);
        this.triggerPantallaInicio.destroy();
        nivelIniciado = true;
        if (this.settingsMenuOpen)hideSettings.call(this);
    }, 1100);
}

function transportarAFinalNivel(jugador, trigger) {

    if (!jugador.body.blocked.right && !trigger.body.blocked.left)
        return;

    bloqueoJugador = true;

    this.cameras.main.stopFollow();

    this.efectoBajarPoder.play();

    this.tweens.add({
        targets: jugador,
        duration: 75,
        alpha: 0
    });

    this.cameras.main.fadeOut(450, 0, 0, 0);

    jugador.anims.play(estadoJugador > 0 ? estadoJugador == 1 ? 'grande-andando'  : 'fuego-andando' : 'andando', true).flipX = false;

    this.techoSubsuelo.destroy();

    setTimeout(() => {
        this.physics.world.setBounds(anchoMundo - anchoPantalla, 0, anchoMundo, altoPantalla);
        this.tpTube = this.add.tileSprite(anchoMundo - anchoPantalla / 1.089, altoPantalla - altoPlataforma, 32, 32, 'tubo-vertical-mediano')
            .setScale(altoPantalla / 345)
            .setOrigin(1);
        this.tpTube.depth = 4;
        this.physics.add.existing(this.tpTube);
        this.tpTube.body.allowGravity = false;
        this.tpTube.body.immovable = true;
        this.physics.add.collider(jugador, this.tpTube);
        this.add.rectangle(anchoMundo - anchoPantalla, 0, anchoMundo, altoPantalla,0x8585FF)
            .setOrigin(0)
            .depth = -1;
        this.add.tileSprite(anchoMundo - anchoPantalla, altoPantalla, anchoPantalla, altoPlataforma, 'labrillos-inicio')
            .setScale(2)
            .setOrigin(0, 0.5)
            .depth = 2;
    }, 500);

    setTimeout(() => {
        jugador.alpha = 1;
        jugador.x = anchoMundo - anchoPantalla / 1.08;
        this.cameras.main.pan(anchoMundo - anchoPantalla / 2, 0, 0);
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.efectoBajarPoder.play();
        this.triggerFinal.destroy();
        this.tweens.add({
            targets: jugador,
            duration: 500,
            y: this.tpTube.getBounds().y
        });
        setTimeout(()=>bloqueoJugador = false, 500);
    }, 1100);
}

function dibujarPantallaPrincipal() {

    const centroPantallaX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

    // Draw sky
    this.add.rectangle(0, 0, anchoPantalla, altoPantalla, 0x8585FF)
        .setOrigin(0)
        .depth = -1;

    let plataforma = this.add.tileSprite(0, altoPantalla, anchoPantalla / 2, altoPlataforma, 'labrillos-inicio')
        .setScale(2)
        .setOrigin(0, 0.5);
    this.physics.add.existing(plataforma);
    plataforma.body.immovable = true;
    plataforma.body.allowGravity = false;
    // Apply jugador collision with plataforma
    this.physics.add.collider(jugador, plataforma);

    /*
    this.add.text(anchoPantalla / 2, altoPantalla - (altoPantalla* 0.9),
    "Known bugs: \n. Mobile controls are (at least) not nice",
    { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 115), align: 'left'}).setLineSpacing(altoPantalla / 34.5);
    */

    this.add.image(anchoPantalla / 50, altoPantalla / 3, 'nube1')
        .setScale(altoPantalla / 1725);
    this.add.image(anchoPantalla / 1.25, altoPantalla / 2, 'nube1')
        .setScale(altoPantalla / 1725);
    this.add.image(anchoPantalla / 1.05, altoPantalla / 6.5, 'nube2')
        .setScale(altoPantalla / 1725);
    this.add.image(anchoPantalla / 3, altoPantalla / 3.5, 'nube2')
        .setScale(altoPantalla / 1725);
    this.add.image(anchoPantalla / 2.65, altoPantalla / 2.8, 'nube2')
        .setScale(altoPantalla / 1725);

    this.add.image(anchoPantalla / 50, altoPantalla / 3, 'nube1')
        .setScale(altoPantalla / 1725);

    this.add.image(anchoPantalla / 25, altoPantalla / 10, 'senial')
        .setOrigin(0)
        .setScale(altoPantalla / 350);

    let propsY = altoPantalla - altoPlataforma;

    this.add.image(anchoPantalla / 50, propsY, 'montania2')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 517);
    this.add.image(anchoPantalla / 300, propsY, 'montania1')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 517);

    this.add.image(anchoPantalla / 4, propsY, 'arbusto1')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 609);
    this.add.image(anchoPantalla / 1.55, propsY, 'arbusto2')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 609);
    this.add.image(anchoPantalla / 1.5, propsY, 'arbusto2')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 609);


    this.add.tileSprite(anchoPantalla / 15, propsY, 350, 35, 'valla')
        .setOrigin(0, 1)
        .setScale(altoPantalla / 863);

    this.bloquePersonalizado = this.add.sprite(centroPantallaX, altoPantalla - (altoPlataforma * 1.9),'bloque-personalizado')
        .setScale(altoPantalla / 345);
    this.bloquePersonalizado.anims.play('bloque-personalizado')
    this.physics.add.collider(jugador, this.bloquePersonalizado, function() {
        if (jugador.body.blocked.up) mostrarAjustes.call(this);
    }, null, this);
    this.physics.add.existing(this.bloquePersonalizado);
    this.bloquePersonalizado.body.allowGravity = false;
    this.bloquePersonalizado.body.immovable = true;

    this.add.image(centroPantallaX, altoPantalla - (altoPlataforma * 1.9), 'ajustes')
        .setScale(altoPantalla / 13000)
        .setInteractive().on('pointerdown', () => mostrarAjustes.call(this));

    this.add.image(centroPantallaX * 1.12, altoPantalla - (altoPlataforma * 1.5), 'bocata-ajustes')
        .setScale(altoPantalla / 620);

    this.add.sprite(centroPantallaX * 1.07, altoPantalla - altoPlataforma, 'npc')
        .setOrigin(0.5, 1)
        .setScale(altoPantalla / 365)
        .anims.play('npc', true);
}

function conseguirBandera() {
    if (banderaConseguida) {
        return false;
    }

    this.cameras.main.stopFollow();

    this.textoTiempoRestante.stopped = true;

    this.temaPrincipal.stop();
    this.temaSubsuelo.stop();
    this.temaRapido.stop();
    this.efectoBanderaLevantada.play();

    this.tweens.add({
        targets: this.banderaFinal,
        duration: 1000,
        y: altoPantalla / 2.2
    });

    setTimeout(()=>this.temaVictoria.play(), 1000);

    banderaConseguida = true;
    bloqueoJugador = true;

    agregarPuntuacion.call(this, 2000, jugador);

    return false;
}

function consumirSeta(jugador, seta) {
    if (derrota || victoria) return;

    this.efectoConsumirPoder.play();
    agregarPuntuacion.call(this, 1000, seta);
    seta.destroy();

    if (estadoJugador > 0 )
        return;

    bloqueoJugador = true;
    this.anims.pauseAll();
    this.physics.pause();
    jugador.setTint(0xfefefe).anims.play('grande-quieto');
    let i = 0;
    let interval = setInterval(() => {
        i++;
        jugador.anims.play(i % 2 === 0 ? 'grande-quieto' : 'quieto');
        if (i > 5) {
            clearInterval(interval);
            jugador.clearTint();
        }
    }, 100);

    setTimeout(() => {
        this.physics.resume();
        this.anims.resumeAll();
        bloqueoJugador = false;
        estadoJugador = 1;
        actualizarTiempo.call(this);
    }, 1000);
    //jugador.body.setSize(16, 32).setOffset(1,0);
}

function consumirFlorFuego(jugador, florFuego) {
    if (derrota || victoria) return;

    this.efectoConsumirPoder.play();
    agregarPuntuacion.call(this, 1000, florFuego);
    florFuego.destroy();

    if (estadoJugador > 1 )
        return;

    let anim = estadoJugador > 0 ? 'grande-quieto' : 'quieto';

    bloqueoJugador = true;
    this.anims.pauseAll();
    this.physics.pause();

    jugador.setTint(0xfefefe).anims.play('fuego-quieto');
    let i = 0;
    let interval = setInterval(() => {
        i++;
        jugador.anims.play(i % 2 === 0 ? 'fuego-quieto' : anim);
        if (i > 5) {
            clearInterval(interval);
            jugador.clearTint();
        }
    }, 100);

    setTimeout(() => {
        this.physics.resume();
        this.anims.resumeAll();
        bloqueoJugador = false;
        estadoJugador = 2;
        actualizarTiempo.call(this);
    }, 1000);
    //jugador.body.setSize(16, 32).setOffset(1,0);
}

function recogerMoneda(jugador, moneda) {
    this.efectoMoneda.play();
    agregarPuntuacion.call(this, 200);
    moneda.destroy();
}

function update(delta) {
    if (derrota || victoria) return;

    actualizarJugador.call(this, delta);

    const velocidadXJugador = jugador.body.velocity.x;
    const camera = this.cameras.main;

    if (velocidadXJugador > 0 && nivelIniciado && !nivelFinalizado && !camera.isFollowing &&
        jugador.x >= anchoPantalla * 1.5 && jugador.x >= (camera.worldView.x + camera.width / 2)) {
        camera.startFollow(jugador, true, 0.1, 0.05);
        camera.isFollowing = true;
    }

    if (velocidadXJugador < 0 && distanciaLejanaJugador < jugador.x && nivelIniciado && !nivelFinalizado && camera.isFollowing) {
        distanciaLejanaJugador = jugador.x;
        camera.setBounds(camera.worldView.x, 0, anchoMundo, altoPantalla);
        camera.stopFollow();
        camera.isFollowing = false;
    }

    if (!nivelFinalizado && !esNivelMundo && camera.isFollowing && jugador.x >= anchoMundo - anchoPantalla * 1.5) {
        nivelFinalizado = true;
        camera.stopFollow();
    }
}
