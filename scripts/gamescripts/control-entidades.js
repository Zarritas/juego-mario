
const goombasVelocityX = anchoPantalla / 19

function createGoombas() {
    this.goombasGroup = this.add.group();

    for (let i = 0; i < Math.trunc(anchoMundo / 960); i++) {
        let x = generarCoordenadasAleatorias(true);
        let goomba = this.physics.add.sprite(x, altoPantalla - altoPlataforma, 'seta')
            .setOrigin(0.5, 1)
            .setBounce(1, 0)
            .setScale(altoPantalla / 376);
        goomba.anims.play('seta-andando', true);
        goomba.smoothed = true;
        goomba.depth = 2;
        if (Phaser.Math.Between(0, 10) <= 4) {
            goomba.setVelocityX(goombasVelocityX)
        } else {
            goomba.setVelocityX(-goombasVelocityX)
        }
        goomba.setMaxVelocity(goombasVelocityX, nivelGravedad)
        this.goombasGroup.add(goomba);
        let plataformaPiezas = this.grupoPlataformas.getChildren();
        this.physics.add.collider(goomba, plataformaPiezas);
        let blocks = this.grupoBloques.getChildren();
        this.physics.add.collider(goomba, blocks);
        let misteryBlocks = this.grupoBloquesMisteriosos.getChildren();
        this.physics.add.collider(goomba, misteryBlocks);
        let goombas = this.goombasGroup.getChildren();
        this.physics.add.collider(goomba, goombas);
        this.physics.add.collider(goomba, this.mastilBanderaFinal);
        this.physics.add.overlap(jugador, goomba, checkGoombaCollision, null, this);
    }

    // Create collision with fall protections to stop goombas from falling off the map
    this.physics.add.collider(this.goombasGroup.getChildren(), this.grupoBloquesInmoviles.getChildren());
    this.physics.add.collider(this.goombasGroup.getChildren(), this.grupoProteccionCaidas.getChildren());
    this.physics.add.collider(this.goombasGroup.getChildren(), this.triggerFinal);

    setInterval(clearGoombas.call(this), 250);
}

function checkGoombaCollision(jugador, goomba) {

    if (goomba.dead)
        return;

    let goombaBeingStomped = jugador.body.touching.down && goomba.body.touching.up;

    if (banderaConseguida)
        return;

    if (invulnerabilidadJugador) {
        if (!goombaBeingStomped) {
            return;
        }
    }

    if (goombaBeingStomped) {
        goomba.anims.play('seta-herida', true);
        goomba.body.enable = false;
        this.goombasGroup.remove(goomba);
        this.efectoSetaPisada.play();
        jugador.setVelocityY(-velocidadY / 1.5);
        agregarPuntuacion.call(this, 100, goomba);
        setTimeout(()=>this.tweens.add({ targets: goomba, duration: 300, alpha: 0 }), 200);
        setTimeout(()=>goomba.destroy(), 500);
        return;
    }

    disminuirEstadoJugador.call(this);
}

function clearGoombas() {
    let goombas = this.goombasGroup.getChildren();

    for (let i = 0; i < goombas.length; i++) {
        if (goombas[i].body.velocity.x == 0 || (goombas[i].body.velocity.x > 0 && goombas[i].body.velocity.x != goombasVelocityX) || (goombas[i].body.velocity.x < 0 && goombas[i].body.velocity.x != -goombasVelocityX)) {
            this.goombasGroup.remove(goombas[i]);
            goombas[i].destroy();
        }
    }
}
