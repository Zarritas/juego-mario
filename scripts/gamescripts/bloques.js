
const velocidadSetaX = anchoPantalla / 15;

function mostrarBloqueOculto(jugador, bloque) {
    if (!jugador.body.blocked.up)
        return;

    this.efectoGolpeBloque.play();

    if (listaBloquesVacios.includes(bloque))
        return;

    listaBloquesVacios.push(bloque);
    bloque.anims.stop();
    bloque.setTexture('bloque-vacio');
    this.tweens.add({
        targets: bloque,
        duration: 75,
        start: performance.now(),
        y: bloque.y - altoPantalla / 34.5,
        onComplete: function() {
            this.tweens.add({
                targets: bloque,
                duration: 75,
                start: performance.now(),
                y: bloque.y + altoPantalla / 34.5
            });
        },
        onCompleteScope: this
    });

    let aleatorio = Phaser.Math.Between(0, 100);
    if (aleatorio < 90) {
        agregarPuntuacion.call(this, 200, bloque);
        this.efectoMoneda.play();
        let moneda = this.physics.add.sprite(bloque.getBounds().x, bloque.getBounds().y, 'moneda')
            .setScale(altoPantalla / 357)
            .setOrigin(0)
            .anims.play('moneda');
        moneda.immovable = true;
        moneda.smoothed = true;
        moneda.depth = 0;

        this.tweens.add({
            targets: moneda,
            duration: 250,
            start: performance.now(),
            y: moneda.y - (altoPantalla / 8.25),
            onComplete: function() {
                this.tweens.add({
                    targets: moneda,
                    duration: 250,
                    start: performance.now(),
                    y: moneda.y + (altoPantalla / 10.35),
                    onComplete: function() {
                        moneda.destroy();
                    }
                });
            },
            onCompleteScope: this
        });

    } else if (aleatorio >= 90 && aleatorio < 96 ) {
        this.efectoAparicionPoder.play();
        let seta = this.physics.add.sprite(bloque.getBounds().x, bloque.getBounds().y, 'super-seta')
            .setScale(altoPantalla / 345)
            .setOrigin(0)
            .setBounce(1, 0);
        this.tweens.add({
            targets: seta,
            duration: 300,
            start: performance.now(),
            y: seta.y - (altoPantalla / 20),
            onComplete: function() {
                if (!seta)
                    return;

                if (Phaser.Math.Between(0, 10) <= 4) {
                    seta.setVelocityX(velocidadSetaX)
                } else {
                    seta.setVelocityX(-velocidadSetaX)
                }
            },
            onCompleteScope: this
        });
        this.physics.add.overlap(jugador, seta, consumirSeta, null, this);
        this.physics.add.collider(seta, this.grupoBloquesMisteriosos.getChildren());
        this.physics.add.collider(seta, this.grupoBloques.getChildren());
        this.physics.add.collider(seta, this.grupoPlataformas.getChildren());
        this.physics.add.collider(seta, this.grupoBloquesInmoviles.getChildren());
        this.physics.add.collider(seta, this.grupoBloquesConstruccion.getChildren());
    } else {
        this.efectoAparicionPoder.play();
        let florFuego = this.physics.add.sprite(bloque.getBounds().x, bloque.getBounds().y, 'flor-fuego')
            .setScale(altoPantalla / 345)
            .setOrigin(0);
        florFuego.body.immovable = true;
        florFuego.body.allowGravity = false;
        florFuego.anims.play('flor-fuego', true);
        this.tweens.add({
            targets: florFuego,
            duration: 300,
            start: performance.now(),
            y: florFuego.y - (altoPantalla / 23)
        });
        this.physics.add.overlap(jugador, florFuego, consumirFlorFuego, null, this);
        let bloquesMisteriosos = this.grupoBloquesMisteriosos.getChildren();
        this.physics.add.collider(florFuego, bloquesMisteriosos);
    }
}

function destruirBloque(jugador, block) {
    if (!jugador.body.blocked.up)
        return;

    this.efectoGolpeBloque.play();
    if (estadoJugador == 0 && !block.isImmovable) {
        this.tweens.add({
            targets: block,
            duration: 75,
            start: performance.now(),
            y: block.y - altoPantalla / 69,
            onComplete: function () {
                this.tweens.add({
                    targets: block,
                    duration: 75,
                    start: performance.now(),
                    y: block.y + altoPantalla / 69
                });
            },
            onCompleteScope: this
        });
    }

    if (estadoJugador > 0 && !(teclasControles.DOWN.isDown|| this.mando.down)) {
        this.efectoGolpeRoto.play();
        agregarPuntuacion.call(this, 50)
        dibujarParticulasDestruccionBloque.call(this, block);
        block.destroy();
    }
}

function dibujarParticulasDestruccionBloque(bloque) {
    let limitesJugador = jugador.getBounds();
    let hitBoxBloque = bloque.getBounds();

    let particulas = [
        [limitesJugador.left, hitBoxBloque.y],
        [limitesJugador.right, hitBoxBloque.y],
        [limitesJugador.left, hitBoxBloque.y + bloque.height * 2.35],
        [limitesJugador.right, hitBoxBloque.y + bloque.height * 2.35]
    ];

    for (let coordenadasParticulas of particulas) {
        let particula = this.physics.add.sprite(coordenadasParticulas[0], coordenadasParticulas[1], 'escombros').anims.play('escombros', true);

        if (coordenadasParticulas[1] === hitBoxBloque.y) {
            particula.setVelocityY(-(altoPantalla / 3.45));
        } else {
            particula.setVelocityY(-(altoPantalla / 2.6));
        }

        particula.setVelocityX(coordenadasParticulas[0] === limitesJugador.left ? -(anchoPantalla / 25.6) : (anchoPantalla / 25.6));
        particula.setScale(altoPantalla / 517);
        particula.depth = 4;
    }

    setTimeout(() => {
        for (let coordenadasParticula of particulas) {
            this.physics.world.disableBody(coordenadasParticula[0], coordenadasParticula[1]);
        }
    }, 3000);
}
