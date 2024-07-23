
function crearJugador() {
    // Draw jugador
    jugador = this.physics.add.sprite( /*anchoPantalla * 1.5*/ inicioDesplazamiento, altoPantalla - altoPlataforma, 'mario')
        .setBounce(0)
        .setCollideWorldBounds(true)
        .setScale(altoPantalla / 376)
        .setOrigin(1);
    jugador.depth = 3;
    /*this.cameras.main.startFollow(jugador);
    estadoJugador = 2;*/
}

function disminuirEstadoJugador() {

    if (estadoJugador <= 0) {
        derrota = true;
        funcionDerrota.call(this);
        return;
    }

    bloqueoJugador = true;
    this.physics.pause();
    this.anims.pauseAll();
    this.efectoBajarPoder.play();

    let anim1 = estadoJugador == 2 ? 'fuego-quieto' : 'grande-quieto';
    let anim2 = estadoJugador == 2 ? 'grande-quieto' : 'quieto';

    aplicarInvulnerabilidadJugador.call(this, 3000);
    jugador.anims.play(anim2);

    let i = 0;
    let interval = setInterval(() => {
        i++;
        jugador.anims.play(i % 2 === 0 ? anim2 : anim1);
        if (i > 5) {
            clearInterval(interval);
        }
    }, 100);

    estadoJugador--;

    setTimeout(() => {
        this.physics.resume();
        this.anims.resumeAll();
        bloqueoJugador = false;
        actualizarTiempo.call(this);
    }, 1000);
}

function aplicarInvulnerabilidadJugador(time) {
    let blinkAnim = this.tweens.add({
        targets: jugador,
        duration: 100,
        alpha: { from: 1, to: 0.2 },
        ease: 'Linear',
        repeat: -1,
        yoyo: true
    });

    invulnerabilidadJugador = true;
    setTimeout(() => {
        invulnerabilidadJugador = false;
        blinkAnim.stop();
        jugador.alpha = 1;
    }, time);
}

function actualizarJugador(delta) {

    // Win animation
    if (bloqueoJugador && banderaConseguida) {
        jugador.setVelocityX(anchoPantalla / 8.5);
        switch (estadoJugador){
            case 0: jugador.anims.play('andando', true).flipX = false; break;
            case 1: jugador.anims.play('grande-andando', true).flipX = false; break;
            case 2: jugador.anims.play('fuego-andando', true); break;
        }

        if(jugador.x >= anchoMundo - (anchoMundo / 75)) {
            this.tweens.add({
                targets: jugador,
                duration: 75,
                alpha: 0
            });
        }
        setTimeout(() => {
            victoria = true;
            jugador.destroy();
            pantallaVictoria.call(this);
        }, 5000);
        return;
    }

    if (jugador.body.blocked.up)
        jugador.setVelocityY(0);

    if (jugador.body.blocked.left || jugador.body.blocked.right)
        jugador.setVelocityX(0);

    // Check if jugador has fallen
    if (jugador.y > altoPantalla - 10 || tiempoRestante <= 0) {
        derrota = true;
        funcionDerrota.call(this);
        return;
    }

    if (bloqueoJugador)
        return;

    // Player controls
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/tilemap/collision/matter%20destroy%20tile%20bodies.js#L323
    // https://codepen.io/rexrainbow/pen/oyqvQY

    // > Vertical movement
    if ((teclasControles.JUMP.isDown || this.mando.up) && jugador.body.touching.down) {
        this.efectoSalto.play();
        jugador.setVelocityY((estadoJugador > 0 && (teclasControles.DOWN.isDown|| this.mando.down)) ? -velocidadY / 1.25 : -velocidadY);
    }

    // > Horizontal movement and animations
    let oldVelocityX;
    let targetVelocityX;
    let newVelocityX;

    if (teclasControles.LEFT.isDown || this.mando.left) {
        controlesSuaves.moverIzquierda(delta);
        if (!disparoJugador) {
            if (estadoJugador == 0)
                jugador.anims.play('andando', true).flipX = true;

            if (estadoJugador == 1)
                jugador.anims.play('grande-andando', true).flipX = true;

            if (estadoJugador == 2)
                jugador.anims.play('fuego-andando', true).flipX = true;
        }

        controlesJugador.direction.positive = false;

        // Lerp the velocity towards the max run using the smoothed controls.
        // This simulates a jugador controlled acceleration.
        oldVelocityX = jugador.body.velocity.x;
        targetVelocityX = -controlesJugador.speed.run;
        newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, -controlesSuaves.value);

        jugador.setVelocityX(newVelocityX);
    } else if (teclasControles.RIGHT.isDown || this.mando.right) {
        controlesSuaves.moverDerecha(delta);
        if (!disparoJugador) {
            if (estadoJugador == 0)
                jugador.anims.play('andando', true).flipX = false;

            if (estadoJugador == 1)
                jugador.anims.play('grande-andando', true).flipX = false;

            if (estadoJugador == 2)
                jugador.anims.play('fuego-andando', true).flipX = false;
        }

        controlesJugador.direction.positive = true;

        // Lerp the velocity towards the max run using the smoothed controls.
        // This simulates a jugador controlled acceleration.
        oldVelocityX = jugador.body.velocity.x;
        targetVelocityX = controlesJugador.speed.run;
        newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, controlesSuaves.value);

        jugador.setVelocityX(newVelocityX);
    } else {
        if (jugador.body.velocity.x != 0)
            controlesSuaves.reset();
        if (jugador.body.touching.down)
            jugador.setVelocityX(0);
        if (!(teclasControles.JUMP.isDown|| this.mando.up) && !disparoJugador) {
            if (estadoJugador == 0)
                jugador.anims.play('quieto', true);

            if (estadoJugador == 1)
                jugador.anims.play('grande-quieto', true);

            if (estadoJugador == 2)
                jugador.anims.play('fuego-quieto', true);
        }
    }

    if (!disparoJugador) {
        if (estadoJugador > 0 && (teclasControles.DOWN.isDown|| this.mando.down)) {
            if (estadoJugador == 1)
                jugador.anims.play('grande-agachado', true);

            if (estadoJugador == 2)
                jugador.anims.play('fuego-agachado', true);

            if (jugador.body.touching.down) {
                jugador.setVelocityX(0);
            }

            jugador.body.setSize(14, 22).setOffset(2, 10);

            return;
        } else {
            if (estadoJugador > 0)
                jugador.body.setSize(14, 32).setOffset(2,0);

            if (estadoJugador == 0)
                jugador.body.setSize(14, 16).setOffset(1.3, 0.5);
        }
    }

    if (jugador.body.touching.down && estadoJugador == 2 && teclasControles.FIRE.isDown && !enfriamientoDisparo) {
        throwFireball.call(this);
        return;
    }

    // Apply jump animation
    if (!jugador.body.touching.down) {
        if (!disparoJugador) {
            if (estadoJugador == 0)
                jugador.anims.play('salto', true);

            if (estadoJugador == 1)
                jugador.anims.play('grande-saltando', true);

            if (estadoJugador == 2)
                jugador.anims.play('fuego-salto', true);
        }
    }
}
