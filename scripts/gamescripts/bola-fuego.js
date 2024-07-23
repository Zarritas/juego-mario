
function throwFireball() {
    this.efectoBolaFuego.play();
    jugador.anims.play('fuego-disparo');
    disparoJugador = true;
    enfriamientoDisparo = true;
    setTimeout(()=> disparoJugador = false, 100);

    setTimeout(()=> enfriamientoDisparo = false, 350);

    let fireball = this.physics.add.sprite(jugador.getBounds().x + (jugador.width * 1.15), jugador.getBounds().y + (jugador.height / 1.25), 'bola-fuego')
        .setScale(altoPantalla / 345);
    fireball.allowGravity = true;
    fireball.dead = false;
    if (controlesJugador.direction.positive) {
        fireball.setVelocityX(velocidadX * 1.3);
        fireball.isVelocityPositive = true;
        fireball.anims.play('bola-fuego-derecha-abajo');
    } else {
        fireball.setVelocityX(-velocidadX * 1.3);
        fireball.isVelocityPositive = false;
        fireball.anims.play('bola-fuego-izquierda-abajo');
    }
    updateFireballAnimation.call(this, fireball);
    this.physics.add.collider(fireball, this.grupoBloques.getChildren(), fireballBounce, null, this);
    this.physics.add.collider(fireball, this.grupoBloquesMisteriosos.getChildren(), fireballBounce, null, this);
    this.physics.add.collider(fireball, this.grupoPlataformas.getChildren(), fireballBounce, null, this);
    this.physics.add.overlap(fireball, this.goombasGroup.getChildren(), fireballCollides, null, this);
    this.physics.add.collider(fireball, this.grupoBloquesInmoviles.getChildren(), fireballBounce, null, this);
    this.physics.add.collider(fireball, this.grupoBloquesConstruccion.getChildren(), fireballBounce, null, this);

    setTimeout(() => {
        fireball.dead = true;
        this.tweens.add({
            targets: fireball,
            duration: 100,
            alpha: { from: 1, to: 0 },
        });
        setTimeout(()=>fireball.destroy(), 100);
    }, 3000);
}

function fireballCollides(fireball, entitie) {
    if (fireball.exploded || fireball.dead)
        return;

    fireball.exploded = true;
    fireball.dead = true;
    fireball.body.moves = false;

    explodeFireball.call(this, fireball);

    this.efectoGolpe.play();

    entitie.anims.play('seta-quieta', true).flipY = true;
    entitie.dead = true;
    this.goombasGroup.remove(entitie);
    entitie.setVelocityX(0);
    entitie.setVelocityY(-velocidadY * 0.4);
    setTimeout(()=>this.tweens.add({ targets: entitie, duration: 750, y: altoPantalla * 1.1 }), 400);

    agregarPuntuacion.call(this, 100, entitie);
    setTimeout(()=>entitie.destroy(), 1250);
}

function explodeFireball(fireball) {
    fireball.anims.play('bola-fuego-explosion-1', true);

    const destroyFireball = () => {
        if (fireball) {
            fireball.destroy();
        }
    };

    Promise.resolve()
        .then(() => new Promise(resolve => setTimeout(() => {
            if (fireball) {
                fireball.anims.play('bola-fuego-explosion-2', true);
            }
            resolve();
        }, 50)))
        .then(() => new Promise(resolve => setTimeout(() => {
            if (fireball) {
                fireball.anims.play('bola-fuego-explosion-3', true);
            }
            resolve();
        }, 35)))
        .then(() => new Promise(resolve => setTimeout(() => {
            destroyFireball();
            resolve();
        }, 45)));
}

function updateFireballAnimation(fireball) {

    if (fireball.exploded || fireball.dead)
        return;

    if (fireball.body.velocity.y > 0) {
        if (fireball.isVelocityPositive) {
            fireball.anims.play('bola-fuego-derecha-arriba');
        } else {
            fireball.anims.play('bola-fuego-izquierda-arriba');
        }
    } else {
        if (fireball.isVelocityPositive) {
            fireball.anims.play('bola-fuego-derecha-abajo');
        } else {
            fireball.anims.play('bola-fuego-izquierda-abajo');
        }
    }

    setTimeout(()=>updateFireballAnimation.call(this, fireball), 250);
}

function fireballBounce(fireball, collider) {

    if (collider.isPlatform && (fireball.body.blocked.left || fireball.body.blocked.right) || !collider.isPlatform && (fireball.body.blocked.left || fireball.body.blocked.right)) {
        fireball.exploded = true;
        fireball.dead = true;
        fireball.body.moves = false;

        this.efectoGolpeBloque.play();
        explodeFireball.call(this, fireball);
        return;
    }

    if (fireball.body.blocked.down)
        fireball.setVelocityY(-nivelGravedad / 3.45);

    if (fireball.body.blocked.up)
        fireball.setVelocityY(nivelGravedad / 3.45);

    if (fireball.body.blocked.left) {
        fireball.isVelocityPositive = false;
        fireball.setVelocityX(velocidadX * 1.3);
    }

    if (fireball.body.blocked.right) {
        fireball.isVelocityPositive = true;
        fireball.setVelocityX(-velocidadX * 1.3);
    }
}
