const escala = altoPantalla / 345;
const altoMuyBajo = altoPantalla - (altoPlataforma * 2.9)
const altoMenosBajo = altoPantalla - (altoPlataforma * 2.4)
const altoAlgoBajo = altoPantalla - (altoPlataforma * 2.37)
const altoBajo = altoPantalla - (altoPlataforma * 2.135)
const altoMedio = altoPantalla - (altoPlataforma * 1.9)
const altoAlto = altoPantalla - altoPlataforma

function generateStructure(piezaInicio) {
    let aleatorio = Phaser.Math.Between(0, 5);

    if (esNivelMundo) {
        switch (aleatorio) {
            case 0:
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(2.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(1.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio,'bloque-misterioso')
                    .setScale(escala));

                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(3.6, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(5.6, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(4.6, 0.5));

                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-2.6, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-4.6, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-3.6, 0.5));
                return Phaser.Math.Between(1, 3);
            case 1:
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(2.8, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(4.8, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(3.8, 0.5));

                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1.9, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-3.9, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-2.9, 0.5));

                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(1.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala));
                return Phaser.Math.Between(1, 3);
            case 2:
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(2.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(1.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                return Phaser.Math.Between(1, 3);
            case 3:
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(0, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(1, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(2, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMuyBajo, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(0, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(1, 0.5));
                return Phaser.Math.Between(1, 3);
            case 4:
                let aleatorio = Phaser.Math.Between(0, 4)
                switch (aleatorio) {
                    case 0:
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                            .setScale(escala));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(-3, 0.5));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(4, 0.5));
                        break;
                    case 1:
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(-3, 0.5));
                        break;
                    case 2:
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala));
                        break;
                    case 3:
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(1.5 , 0.5));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(-0.5 , 0.5));
                        break;
                    case 4:
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(1.75, 0.5));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(0.75, 0.5));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(-0.25, 0.5));
                        this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                            .setScale(escala)
                            .setOrigin(-1.25, 0.5));
                        break;
                }
                return Phaser.Math.Between(1, 2);
            case 5:
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale()
                    .setOrigin(1.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(0.5, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                return Phaser.Math.Between(1, 2);
        }
    } else {
        let aleatorio = Phaser.Math.Between(0, 5);

        switch (aleatorio) {
            case 0:
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(2.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(1.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-1.5, 0.5));
                break;
            case 1:
                this.grupoBloquesInmoviles.add(this.add.tileSprite(piezaInicio, altoAlto, 16, 16, 'bloque-inmovil')
                    .setScale(escala)
                    .setOrigin(6.5, 1));
                this.grupoBloquesInmoviles.add(this.add.tileSprite(piezaInicio, altoAlto, 16, 32, 'bloque-inmovil')
                    .setScale(escala)
                    .setOrigin(4.5, 1));
                this.grupoBloquesInmoviles.add(this.add.tileSprite(piezaInicio, altoAlto, 16, 46, 'bloque-inmovil')
                    .setScale(escala)
                    .setOrigin(2.5, 1));
                this.grupoBloquesInmoviles.add(this.add.tileSprite(piezaInicio, altoAlto, 16, 64, 'bloque-inmovil')
                    .setScale(escala)
                    .setOrigin(0.5, 1));
                this.grupoBloquesInmoviles.add(this.add.tileSprite(piezaInicio, altoAlto, 16, 46, 'bloque-inmovil')
                    .setScale(escala)
                    .setOrigin(-1.5, 1));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-3.5, 0.5));
                this.grupoBloquesInmoviles.add(this.add.tileSprite(piezaInicio, altoAlto, '16', '32', 'bloque-inmovil')
                    .setScale(escala)
                    .setOrigin(-5.5, 1));
                break;
            case 2:
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(4.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(3.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(2.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(2.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoAlgoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(2.5, 0.5));

                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoAlgoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(1.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoAlgoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(0.5, 0.5));

                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-2.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-2.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoAlgoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-2.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-1.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));
                this.grupoBloquesConstruccion.add(this.add.tileSprite(piezaInicio, altoAlgoBajo, 16, 16, 'bloque2')
                    .setScale(escala)
                    .setOrigin(-0.5, 0.5));

                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(5.25, 1.7));

                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMenosBajo, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(3.75, 1.65));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMenosBajo, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(2.2, 1.65));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMenosBajo, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(0.5, 1.65));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMenosBajo, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-1.15, 1.65));

                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-2.7, 1.7));
                break;
            case 3:
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(3, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMuyBajo, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(2, 0.5));

                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(3, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(2, 0.5));

                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-1, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-2, 0.5));
                this.grupoBloquesMisteriosos.add(this.add.sprite(piezaInicio, altoMedio, 'bloque-misterioso')
                    .setScale(escala)
                    .setOrigin(-3, 0.5));
                break
            case 4:
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(2.9, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(1.3, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-0.3, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-1.9, 1.7));

                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(2, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(1, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(0, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1, 0.5));
                break;
            case 5:
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(6.1, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(4.5, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(2.9, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(1.3, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-0.3, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-1.9, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-3.5, 1.7));
                this.grupoMonedasSuelo.add(this.physics.add.sprite(piezaInicio, altoMedio, 'moneda-suelo')
                    .setScale(escala)
                    .setOrigin(-5, 1.7));

                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(4, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(3, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(2, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(1, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(0, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-1, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-2, 0.5));
                this.grupoBloques.add(this.add.tileSprite(piezaInicio, altoMedio, 16, 16, 'bloque')
                    .setScale(escala)
                    .setOrigin(-3, 0.5));
                break;
        }

        return 1;
    }
}