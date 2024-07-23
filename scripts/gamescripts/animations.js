function crearAnimaciones() {

    //> Mario animations
    this.anims.create({
        key: 'quieto',
        frames: [{ key: 'mario', frame: 0 }]
    });
    this.anims.create({
        key: 'andando',
        frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 1 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'herido',
        frames: [{ key: 'mario', frame: 4 }]
    });
    this.anims.create({
        key: 'salto',
        frames: [{ key: 'mario', frame: 5 }]
    });

    //> Grown Mario animations
    this.anims.create({
        key: 'grande-quieto',
        frames: [{ key: 'mario-grande', frame: 0 }]
    });
    this.anims.create({
        key: 'grande-andando',
        frames: this.anims.generateFrameNumbers('mario-grande', { start: 3, end: 1 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'grande-agachado',
        frames: [{ key: 'mario-grande', frame: 4 }]
    });
    this.anims.create({
        key: 'grande-saltando',
        frames: [{ key: 'mario-grande', frame: 5 }]
    });

    //> Fire Mario animations
    this.anims.create({
        key: 'fuego-quieto',
        frames: [{ key: 'mario-fuego', frame: 0 }]
    });
    this.anims.create({
        key: 'fuego-andando',
        frames: this.anims.generateFrameNumbers('mario-fuego', { start: 3, end: 1 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'fuego-agachado',
        frames: [{ key: 'mario-fuego', frame: 4 }]
    });
    this.anims.create({
        key: 'fuego-salto',
        frames: [{ key: 'mario-fuego', frame: 5 }]
    });
    this.anims.create({
        key: 'fuego-disparo',
        frames: [{ key: 'mario-fuego', frame: 6 }]
    });

    //> Goomba animations
    this.anims.create({
        key: 'seta-quieta',
        frames: [{ key: 'seta', frame: 1 }]
    });
    this.anims.create({
        key: 'seta-andando',
        frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'seta-herida',
        frames: [{ key: 'seta', frame: 2 }]
    });

    //> koopas animations
    this.anims.create({
        key: 'tortuga-quieta',
        frames: [{ key: 'tortuga', frame: 1 }]
    });
    this.anims.create({
        key: 'tortuga-andando',
        frames: this.anims.generateFrameNumbers('tortuga', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'tortuga-herida',
        frames: [{ key: 'tortuga', frame: 0 }]
    });
    this.anims.create({
        key: 'tortuga-caparazon',
        frames: [{ key: 'tortuga', frame: 1 }]
    });

    //> Coins
    this.anims.create({
        key: 'moneda',
        frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    //> Ground coin
    this.anims.create({
        key: 'moneda-suelo',
        frames: this.anims.generateFrameNumbers('moneda-suelo', { start: 2, end: 0 }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 5
    });

    //> Mistery blocks
    this.anims.create({
        key: 'bloque-misterioso',
        frames: this.anims.generateFrameNumbers('bloque-misterioso', { start: 2, end: 0 }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 5
    });

    //> Custom blocks
    this.anims.create({
        key: 'bloque-personalizado',
        frames: this.anims.generateFrameNumbers('bloque-personalizado', { start: 2, end: 0 }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 5
    });

    //> Brick debris
    this.anims.create({
        key: 'escombros',
        frames: this.anims.generateFrameNumbers('escombros', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
    });

    //> Fireflower
    this.anims.create({
        key: 'flor-fuego',
        frames: this.anims.generateFrameNumbers('flor-fuego', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    //> Fireball
    this.anims.create({
        key: 'bola-fuego-izquierda-abajo',
        frames: [{ key: 'bola-fuego', frame: 0 }]
    });
    this.anims.create({
        key: 'bola-fuego-izquierda-arriba',
        frames: [{ key: 'bola-fuego', frame: 1 }]
    });
    this.anims.create({
        key: 'bola-fuego-derecha-abajo',
        frames: [{ key: 'bola-fuego', frame: 2 }]
    });
    this.anims.create({
        key: 'bola-fuego-derecha-arriba',
        frames: [{ key: 'bola-fuego', frame: 3 }]
    });

    //> Fireball explosion
    this.anims.create({
        key: 'bola-fuego-explosion-1',
        frames: [{ key: 'explosion-bola-fuego', frame: 0 }]
    });
    this.anims.create({
        key: 'bola-fuego-explosion-2',
        frames: [{ key: 'explosion-bola-fuego', frame: 1 }]
    });
    this.anims.create({
        key: 'bola-fuego-explosion-3',
        frames: [{ key: 'explosion-bola-fuego', frame: 2 }]
    });

    //> NPC
    this.anims.create({
        key: 'npc',
        frames: this.anims.generateFrameNumbers('npc', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1,
        repeatDelay: 10
    });
}
