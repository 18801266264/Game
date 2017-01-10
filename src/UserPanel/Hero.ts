var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function () {
        var cacheKey = "_cache" + propertyName;
        return getter.apply(this);
        // if (this["cacheKey"] != null) {
        //     return target["cacheKey"];
        // } else {
        //     this["cacheKey"] = getter.apply(this);
        //     return target["cacheKey"];
        // }
    }
    return desc;
}

class User {
    cash = 100;
    gold = 100;
    exp = 0;
    totalExp = 100;
    level = 1;
    heroes: Hero[] = [];
    //  _heroesInTeam: Hero[] = [];

    constructor(cash: number, gold: number, exp: number, totalExp: number, level: number, heroes: Hero[]) {
        this.cash = cash;
        this.gold = gold;
        this.exp = exp;
        this.totalExp = totalExp;
        this.level = level;
        this.heroes = heroes;
    }

    get heroesInTeam() {
        return this.heroes.filter(hero => hero.isInTeam);
    }

  //  @Cache
    get fightPower() {
        return this.getFightPower();
    }

    getFightPower() {
        var result = 0;
        this.heroesInTeam.forEach(hero => result += hero.getFightPower());
        // result += this.heroesInTeam.fightPower;
        return result;
    }
}

enum Rare {
    "普通" = 0,
    "稀有" = 1,
    "史诗" = 2,
    "传说" = 3
}

class Hero {
    isInTeam: boolean = false;
    hp = 50;
    level = 1;
    quality = Rare.史诗;
    equipments: Equipment[] = [];
    properties: Properties;

    constructor(isInTeam: boolean, hp: number, level: number, quality: number, equipments: Equipment[]) {
        this.isInTeam = isInTeam;
        this.hp = hp;
        this.level = level;
        this.quality = quality;
        this.equipments = equipments;
        this.properties = new Properties();
        this.properties.all.push(new Property("等级", this.level, false));
        this.properties.all.push(new Property("品质", this.quality, false));
        // this.properties.all.push(new Property("最大生命值", this.properties.all[0].value * 100 * this.properties.all[1].value, false));
        this.properties.all.push(new Property("最大生命值", this.maxHp, false));
        this.properties.all.push(new Property("攻击力", this.attack, false));
        this.properties.all.push(new Property("暴击率", 0, true));
        this.properties.all.push(new Property("英雄战斗力", this.getFightPower(), false));
    }

    get maxHp() {
        return this.level * 1000 * this.quality;
    }

    get attack() {
        var result = 0;
        this.equipments.forEach(e => result += e.fightPower);
        return result;
    }

   // @Cache
    get fightPower() {
        return this.getFightPower();
    }

    getFightPower() {
        return this.maxHp * 1.5 + this.attack * 1.8;
    }
}

class Equipment {
    level = 1;
    quality = Rare.传说;
    jewels: Jewel[] = [];
    properties: Properties;

    constructor(level: number, quality: number, jewels: Jewel[]) {
        this, level = level;
        this.quality = quality;
        this.jewels = jewels;
        this.properties = new Properties();
        this.properties.all.push(new Property("等级", this.level, false));
        this.properties.all.push(new Property("品质", this.quality, false));
        this.properties.all.push(new Property("攻击力", this.equipmentSelfPower, false));
        this.properties.all.push(new Property("宝石加成", this.jewelPower, false));
        this.properties.all.push(new Property("装备战斗力", this.getFightPower(), false));
    }

    get equipmentSelfPower() {
        return this.level * 50 * this.quality;
    }

    get jewelPower() {
        var result = 0;
        this.jewels.forEach(e => result += e.fightPower);
        return result;
    }

   // @Cache
    get fightPower() {
        return this.getFightPower();
    }

    getFightPower() {
        return this.equipmentSelfPower * 1.8 + this.jewelPower * 1.5;
    }
}

class Jewel {
    level = 1;
    quality = Rare.稀有;

    constructor(level: number, quality: number) {
        this.level = level;
        this.quality = quality;
    }

  //  @Cache
    get fightPower() {
        return this.getFightPower();
    }

    getFightPower() {
        return this.level * 10 * this.quality;
    }
}

class Property {
    name: string;
    value: number;
    isRate: boolean;

    constructor(name: string, value: number, isRate: boolean) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }

    getDescription() {
        if (this.isRate) {
            return this.name + ":+" + (this.value / 10).toFixed(2) + "%" + "\n";
        } else {
            return this.name + ":+" + this.value + "\n";
        }
    }
}

class Properties {
    all: Property[];
    constructor() {
        this.all = [];
    }
}

function createHeroDes(hero: Hero) {
    var container = new egret.DisplayObjectContainer();
    container.x = 220;
    container.y = 10;
    var textField = new egret.TextField();

    for (var h of hero.properties.all) {
        textField.text += h.getDescription();
        container.addChild(textField);
    }
    return container;
}

function createEquipmentDes(hero: Hero) {
    var container = new egret.DisplayObjectContainer();
    container.x = 220;
    container.y = 240;
    var textField = new egret.TextField();

    for (var e of hero.equipments) {
        for (var a of e.properties.all) {
            textField.text += a.getDescription();
            container.addChild(textField);
        }
    }
    return container;
}


class Panel extends egret.DisplayObjectContainer {
    constructor(heroes: Hero[]) {
        super();
        for (var i = 0; i < heroes.length; i++) {
            this.addChild(createHeroDes(heroes[i]));
            this.addChild(createEquipmentDes(heroes[i]));
        }
    }
}