function createHUD() {
    let posY = anchoPantalla / 23;

    this.textoPuntuacion = this.add.text(anchoPantalla / 40, posY, '', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 65), align: 'left'});
    this.textoPuntuacion.setScrollFactor(0)
        .depth = 5;

    this.textoRecord = this.add.text(anchoPantalla / 2, posY, 'RECORD\n 000000', { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 65), align: 'center'})
        .setOrigin(0.5, 0);
    this.textoRecord.setScrollFactor(0)
        .depth = 5;

    this.textoTiempoRestante = this.add.text(anchoPantalla * 0.9, posY, 'TIEMPO\n' + tiempoRestante.toString().padStart(3, '0'), { fontFamily: 'pixel_nums', fontSize: (anchoPantalla / 65), align: 'right'});
    this.textoTiempoRestante.setScrollFactor(0)
        .depth = 5;

    let localHighScore = localStorage.getItem('high-score');
    if (localHighScore !== null) {
        this.textoRecord.setText('RECORD\n' + localHighScore.toString().padStart(6, '0'))
    }

    actualizarPuntuacion.call(this);
}

function actualizarPuntuacion() {
    if (!this.textoPuntuacion) return;

    this.textoPuntuacion.setText('MARIO\n' + puntuacion.toString().padStart(6, '0'));
}

function actualizarTiempo() {
    if (!this.textoTiempoRestante || tiempoRestante <= 0 || this.textoTiempoRestante.stopped || bloqueoJugador) return;

    if (tiempoRestante == 100) {
        this.temaPrincipal.stop();
        this.temaSubsuelo.stop()
        this.efectoAdvertenciaTiempo.play();
        setTimeout(()=>this.temaRapido.play(), 2400);
    }

    if (!this.textoTiempoRestante.stopped) {
        tiempoRestante--;
        this.textoTiempoRestante.setText('TIEMPO\n' + tiempoRestante.toString().padStart(3, '0'));
    }

    setTimeout(()=>actualizarTiempo.call(this), 500);
}

function agregarPuntuacion(num, objetoOrigen) {

    for (let i = 1; i <= num; i++) {
        setTimeout(() => {
            puntuacion++;
            actualizarPuntuacion.call(this);
        }, i);
    }

    if (!objetoOrigen) return;

    const efectoTexto = this.add.text(objetoOrigen.getBounds().x, objetoOrigen.getBounds().y, num, {
        fontFamily: 'pixel_nums',
        fontSize: (anchoPantalla / 150),
        align: 'center'
    });

    efectoTexto.setOrigin(0).smoothed = true;
    efectoTexto.depth = 5;

    this.tweens.add({
        targets: efectoTexto,
        duration: 600,
        y: efectoTexto.y - altoPantalla / 6.5,
        onComplete: () => {
            this.tweens.add({
                targets: efectoTexto,
                duration: 100,
                alpha: 0,
                onComplete: () => {
                    efectoTexto.destroy();
                }
            });
        }
    });
}


// Game over functions

function funcionDerrota() {
    this.textoTiempoRestante.stopped = true;
    jugador.anims.play('herido', true);
    jugador.body.enable = false;
    this.mastilBanderaFinal.body.enable = false;
    let setas = this.goombasGroup.getChildren();
    setas.forEach(seta => {
        seta.anims.stop();
        seta.body.enable = false;
    });
    let plataformaPiezas = this.grupoPlataformas.getChildren();
    plataformaPiezas.forEach(plataformaPieza => {
        plataformaPieza.body.enable = false;
    });
    let bloques = this.grupoBloques.getChildren();
    bloques.forEach(bloque => {
        bloque.body.enable = false;
    });
    let bloquesMisteriosos = this.grupoBloquesMisteriosos.getChildren();
    bloquesMisteriosos.forEach(bloqueMisterioso => {
        bloqueMisterioso.body.enable = false;
    });
    jugador.body.setSize(16, 16).setOffset(0);
    jugador.setVelocityX(0);
    setTimeout(() => {
        jugador.body.enable = true;
        jugador.setVelocityY(-velocidadY * 1.1);
    }, 500);
    this.temaPrincipal.stop();
    this.temaSubsuelo.stop();
    this.temaRapido.stop();
    this.temaDerrota.play();
    setTimeout(() => {
        jugador.depth = 0;
        pantallaDerrota.call(this, tiempoRestante <= 0);
        this.physics.pause();
    }, 3000);
}

function pantallaDerrota(outOfTime=false) {
    if (localStorage.getItem('high-score') !== null) {
        if (localStorage.getItem('high-score') < puntuacion) {
            localStorage.setItem('high-score', puntuacion);
            this.textoRecord.setText('NUEVO RECORD!\n' + puntuacion.toString().padStart(6, '0'))
        }
    } else {
        localStorage.setItem('high-score', puntuacion);
    }

    const centroPantallaX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    let gameOverScreen = this.add.rectangle(0, altoPantalla / 2, anchoMundo, altoPantalla, 0x000000).setScrollFactor(0);
    gameOverScreen.alpha = 0;
    gameOverScreen.depth = 4;
    this.tweens.add({
        targets: gameOverScreen,
        duration: 200,
        alpha: 1
    });
    this.add.bitmapText(centroPantallaX, altoPantalla / 3, 'carrier_command', outOfTime ? 'TIEMPO UP' : 'GAME OVER', anchoPantalla / 30)
        .setOrigin(0.5)
        .depth = 5;
    pantallaFinal.call(this,centroPantallaX);
}

function pantallaVictoria() {
    if (localStorage.getItem('high-score') !== null) {
        if (localStorage.getItem('high-score') < puntuacion) {
            localStorage.setItem('high-score', puntuacion);
            this.textoRecord.setText('NUEVO RECORD!\n' + puntuacion.toString().padStart(6, '0'))
        }
    } else {
        localStorage.setItem('high-score', puntuacion);
        this.textoRecord.setText('NUEVO RECORD!\n' + puntuacion.toString().padStart(6, '0'))
    }

    const centroPantallaX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    let pantallaVictoria = this.add.rectangle(0, altoPantalla / 2, anchoMundo, altoPantalla, 0x000000).setScrollFactor(0);
    pantallaVictoria.alpha = 0;
    pantallaVictoria.depth = 4;
    this.tweens.add({
        targets: pantallaVictoria,
        duration: 300,
        alpha: 1
    });
    this.add.bitmapText(centroPantallaX, altoPantalla / 3, 'carrier_command', 'HAS GANADO!', anchoPantalla / 30)
        .setOrigin(0.5)
        .depth = 5;
    pantallaFinal.call(this,centroPantallaX);
}

function pantallaFinal(centroX){
    this.add.bitmapText(centroX, altoPantalla / 2, 'carrier_command', '> PLAY AGAIN', anchoPantalla / 50)
        .setOrigin(0.5)
        .setInteractive().on('pointerdown', () => location.reload())
        .depth = 5;
    this.add.bitmapText(centroX, altoPantalla / 1.7, 'carrier_command', '> SCREENSHOT', anchoPantalla / 50)
        .setOrigin(0.5)
        .setInteractive().on('pointerdown', () => getScreenshot())
        .depth = 5;
}
