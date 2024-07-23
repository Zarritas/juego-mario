
var controladorDeTeclas;

function mostrarAjustes() {
    if (!this.settingsMenuOpen) {
        this.settingsMenuOpen = true;
        jugador.anims.play('quieto', true);
        bloqueoJugador = true;
        jugador.setVelocityX(0);
        this.temaPrincipal.pause();
        this.efectoPausa.play();
        dibujarMenuAjustes.call(this);
    }
}

function hideSettings() {
    let settingsObjects = this.objetosMenuAjustes.getChildren();

    for (let i = 0; i < settingsObjects.length; i++) {
        settingsObjects[i].visible = false;
    }
    this.temaPrincipal.resume();
    bloqueoJugador = false;
    applySettings.call(this);
    this.settingsMenuOpen = false;
}

function dibujarMenuAjustes() {

    if (this.menuAjustesCreado) {
        let settingsObjects = this.objetosMenuAjustes.getChildren();
        for (let i = 0; i < settingsObjects.length; i++) {
            settingsObjects[i].visible = true;
        }
        return;
    }

    this.menuAjustesCreado = true;

    this.objetosMenuAjustes = this.add.group();

    //> Settings

    let fondoAjustes = this.add.rectangle(0, altoPantalla / 2, anchoMundo, altoPantalla, 0x171717, 0.95)
        .setScrollFactor(0);
    fondoAjustes.depth = 4
    this.objetosMenuAjustes.add(fondoAjustes);

    let botonXAjustes = this.add.text(anchoPantalla * 0.94, altoPantalla - (altoPantalla* 0.9), 'x', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 50), align: 'center'})
        .setInteractive()
        .on('pointerdown',() => hideSettings.call(this));
    botonXAjustes.depth = 5;
    this.objetosMenuAjustes.add(botonXAjustes);

    let textoAjustes = this.add.text(anchoPantalla / 6, altoPantalla - (altoPantalla* 0.85), 'AJUSTES', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 45), align: 'center'});
    textoAjustes.depth = 5;
    this.objetosMenuAjustes.add(textoAjustes);

    let checkboxMusica = this.add.rexCheckbox(anchoPantalla / 10, altoPantalla / 2.9, anchoPantalla / 40, anchoPantalla / 40, {
        color: 0x323232,
        checked: localStorage.getItem('music-enabled') == 'true' || localStorage.getItem('music-enabled') == 'false' ? localStorage.getItem('music-enabled') == 'true' : true,
        animationDuration: 150
    });
    checkboxMusica.depth = 5;
    this.objetosMenuAjustes.add(checkboxMusica);

    checkboxMusica.on('valuechange', function() {
        localStorage.setItem('music-enabled', checkboxMusica.checked)
    });

    let textoCheckboxMusica = this.add.text(anchoPantalla / 8, altoPantalla / 2.9, 'Music', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'})
        .setOrigin(0.5, 0)
        .setInteractive().on('pointerdown', () => checkboxMusica.toggleChecked());
    textoCheckboxMusica.setOrigin(0, 0.4)
        .depth = 5;
    this.objetosMenuAjustes.add(textoCheckboxMusica);

    let efectoCheckbox = this.add.rexCheckbox(anchoPantalla / 10, altoPantalla / 2.3, anchoPantalla / 40, anchoPantalla / 40, {
        color: 0x323232,
        checked: localStorage.getItem('effects-enabled') == 'true' || localStorage.getItem('effects-enabled') == 'false'
            ? localStorage.getItem('effects-enabled') == 'true'
            : true,
        animationDuration: 150
    });
    efectoCheckbox.depth = 5;
    this.objetosMenuAjustes.add(efectoCheckbox);

    efectoCheckbox.on('valuechange', function() {
        localStorage.setItem('effects-enabled', efectoCheckbox.checked)
    });

    let textoEfectoCheckbox = this.add.text(anchoPantalla / 8, altoPantalla / 2.3, 'Effects', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'})
        .setOrigin(0.5, 0)
        .setInteractive().on('pointerdown', () => efectoCheckbox.toggleChecked());
    textoEfectoCheckbox.setOrigin(0, 0.4)
        .depth = 5;
    this.objetosMenuAjustes.add(textoEfectoCheckbox);

    let botonDeslizante = this.add.circle(anchoPantalla / 5.15, altoPantalla / 1.6, anchoPantalla / 115, 0xffffff, 0.75)
    botonDeslizante.slider = this.plugins.get('rexsliderplugin').add(botonDeslizante, {
        endPoints: [{
            x: botonDeslizante.x - anchoPantalla / 9.5,
            y: botonDeslizante.y
        },
            {
                x: botonDeslizante.x + anchoPantalla / 9.5,
                y: botonDeslizante.y
            }
        ],
        value: 0.69
    });
    botonDeslizante.depth = 5;
    this.objetosMenuAjustes.add(botonDeslizante);

    let barraDeslizante = this.add.graphics();
    barraDeslizante.lineStyle(5, 0x373737, 1)
        .strokePoints(botonDeslizante.slider.endPoints)
        .depth = 4;
    this.objetosMenuAjustes.add(barraDeslizante);

    let textoBotonDeslizante = this.add.text(anchoPantalla / 5.15, altoPantalla / 1.85, 'General volume', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 60), align: 'center'})
        .setOrigin(0.5, 0);
    textoBotonDeslizante.depth = 5;
    this.objetosMenuAjustes.add(textoBotonDeslizante);

    let textoPorcentajeBarraDeslizante = this.add.text(anchoPantalla / 5.15, altoPantalla / 1.5, Math.trunc(botonDeslizante.slider.value * 100), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 80), align: 'center'})
        .setOrigin(0.5, 0);
    textoPorcentajeBarraDeslizante.depth = 5;
    this.objetosMenuAjustes.add(textoPorcentajeBarraDeslizante);

    botonDeslizante.slider.on('valuechange', function() {
        textoPorcentajeBarraDeslizante.setText(Math.trunc(botonDeslizante.slider.value * 100));
        localStorage.setItem('volume', Math.trunc(botonDeslizante.slider.value * 100))
    });

    if (localStorage.getItem('volume')) {
        botonDeslizante.slider.value = localStorage.getItem('volume') / 100;
    }

    let lineaSeparacion = this.add.graphics();
    lineaSeparacion.lineStyle(0.5, 0xffffff, 0.1).strokePoints([{
        x: anchoPantalla / 2,
        y: altoPantalla * 0.85
    },
        {
            x: anchoPantalla / 2,
            y: altoPantalla * 0.15
        }]).depth = 4;
    this.objetosMenuAjustes.add(lineaSeparacion);

    //> Controls

    let textoControles = this.add.text(anchoPantalla / 1.5, altoPantalla - (altoPantalla* 0.85), 'Controls', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 45), align: 'center'});
    textoControles.depth = 5;
    this.objetosMenuAjustes.add(textoControles);

    // Special thanks to chatGPT for making this list for me
    const mapaCaracteresEspeciales = {
        8: 'BACKSPACE',
        9: 'TAB',
        13: 'ENTER',
        16: 'SHIFT',
        17: 'CTRL',
        18: 'ALT',
        20: 'CAPS',
        27: 'ESCAPE',
        32: 'SPACE',
        33: 'PAGE UP',
        34: 'PAGE DOWN',
        35: 'END',
        36: 'HOME',
        37: '←',
        38: '↑',
        39: '→',
        40: '↓',
        45: 'INSERT',
        46: 'DELETE',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        192: 'Ñ',
        219: '?',
        220: '¿'
    };

    const mostrarCaracter = charCode => mapaCaracteresEspeciales[charCode] || String.fromCharCode(charCode);

    const textoDirecciones = [
        {
            control: 'JUMP',
            text: this.add.text(anchoPantalla / 1.37, altoPantalla / 2.25, mostrarCaracter(teclasControles.JUMP.keyCode), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'}),
            icon: this.add.sprite(anchoPantalla / 1.37, altoPantalla / 2, 'mario')
                .setScale(altoPantalla / 500)
                .setOrigin(0.5)
                .anims.play('salto')
        },
        {
            control: 'DOWN',
            text: this.add.text(anchoPantalla / 1.37, altoPantalla / 1.75, mostrarCaracter(teclasControles.DOWN.keyCode), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'}),
            icon: this.add.sprite(anchoPantalla / 1.37, altoPantalla / 1.68, 'mario-grande')
                .setScale(altoPantalla / 550)
                .setOrigin(0.6, 0)
                .anims.play('grande-agachado')
        },
        {
            control: 'LEFT',
            text: this.add.text(anchoPantalla / 1.5, altoPantalla / 1.75, mostrarCaracter(teclasControles.LEFT.keyCode), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'}),
            icon: this.add.sprite(anchoPantalla / 1.56, altoPantalla / 1.75, 'mario')
                .setScale(altoPantalla / 500)
                .setFlipX(true)
                .setOrigin(0.6, 0.5)
        },
        {
            control: 'RIGHT',
            text: this.add.text(anchoPantalla / 1.26, altoPantalla / 1.75, mostrarCaracter(teclasControles.RIGHT.keyCode), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'}),
            icon: this.add.sprite(anchoPantalla / 1.22, altoPantalla / 1.75, 'mario')
                .setScale(altoPantalla / 500)
                .setOrigin(0.6, 0.5)
        },
        {
            control: 'FIRE',
            text: this.add.text(anchoPantalla / 1.65, altoPantalla / 2.5, mostrarCaracter(teclasControles.FIRE.keyCode), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 55), align: 'center'}),
            icon: this.add.sprite(anchoPantalla / 1.65, altoPantalla / 2.25, 'bola-fuego')
                .setScale(altoPantalla / 300)
                .setOrigin(0.5)
                .anims.play('bola-fuego-derecha-abajo', true)
        },
    ];

    textoDirecciones.forEach(({control, text, icon}) => {
        text.setInteractive()
            .setOrigin(0.5, 0.4)
            .depth = 5;
        icon.depth = 5;
        this.objetosMenuAjustes.add(text);
        this.objetosMenuAjustes.add(icon);

        text.on('pointerdown', function () {
            text.setText('...');

            controladorDeTeclas = function (event) {
                document.removeEventListener('keydown', controladorDeTeclas);

                let key = event.keyCode;

                if (Object.values(teclasControles).some(({ keyCode }) => keyCode === key)) {
                    alert('Tecla ya en uso!');
                    text.setText(mostrarCaracter(teclasControles[control].keyCode));
                    return;
                }

                teclasControles[control] = this.input.keyboard.addKey(key);
                text.setText(mostrarCaracter(teclasControles[control].keyCode));
                localStorage.setItem(control, teclasControles[control].keyCode);
            }.bind(this);
            document.addEventListener('keydown', controladorDeTeclas);
        }.bind(this));
    });
}

function applySettings() {

    if (localStorage.getItem('volume')) {
        this.sound.volume = localStorage.getItem('volume') / 100;
    } else {
        this.sound.volume = 0.69;
    }

    if (localStorage.getItem('music-enabled')) {
        let isMuted = localStorage.getItem('music-enabled') == 'false';

        let musicElems = this.grupoMusica.getChildren();
        for (let i = 0; i < musicElems.length; i++) {
            musicElems[i].setMute(isMuted);
        }
    }

    if (localStorage.getItem('effects-enabled')) {
        let isMuted = localStorage.getItem('effects-enabled') == 'false';

        let effectsElems = this.grupoEfectos.getChildren();
        for (let i = 0; i < effectsElems.length; i++) {
            effectsElems[i].setMute(isMuted);
        }
    }
}
