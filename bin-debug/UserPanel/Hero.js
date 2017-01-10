var Cache = function (target, propertyName, desc) {
    var getter = desc.get;
    desc.get = function () {
        var cacheKey = "_cache" + propertyName;
        return getter.apply(this);
        // if (this["cacheKey"] != null) {
        //     return target["cacheKey"];
        // } else {
        //     this["cacheKey"] = getter.apply(this);
        //     return target["cacheKey"];
        // }
    };
    return desc;
};
var User = (function () {
    //  _heroesInTeam: Hero[] = [];
    function User(cash, gold, exp, totalExp, level, heroes) {
        this.cash = 100;
        this.gold = 100;
        this.exp = 0;
        this.totalExp = 100;
        this.level = 1;
        this.heroes = [];
        this.cash = cash;
        this.gold = gold;
        this.exp = exp;
        this.totalExp = totalExp;
        this.level = level;
        this.heroes = heroes;
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "heroesInTeam"
        ,function () {
            return this.heroes.filter(function (hero) { return hero.isInTeam; });
        }
    );
    d(p, "fightPower"
        //  @Cache
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        var result = 0;
        this.heroesInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
        // result += this.heroesInTeam.fightPower;
        return result;
    };
    return User;
}());
egret.registerClass(User,'User');
var Rare;
(function (Rare) {
    Rare[Rare["普通"] = 0] = "普通";
    Rare[Rare["稀有"] = 1] = "稀有";
    Rare[Rare["史诗"] = 2] = "史诗";
    Rare[Rare["传说"] = 3] = "传说";
})(Rare || (Rare = {}));
var Hero = (function () {
    function Hero(isInTeam, hp, level, quality, equipments) {
        this.isInTeam = false;
        this.hp = 50;
        this.level = 1;
        this.quality = Rare.史诗;
        this.equipments = [];
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
    var d = __define,c=Hero,p=c.prototype;
    d(p, "maxHp"
        ,function () {
            return this.level * 1000 * this.quality;
        }
    );
    d(p, "attack"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e.fightPower; });
            return result;
        }
    );
    d(p, "fightPower"
        // @Cache
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        return this.maxHp * 1.5 + this.attack * 1.8;
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(level, quality, jewels) {
        this.level = 1;
        this.quality = Rare.传说;
        this.jewels = [];
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
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "equipmentSelfPower"
        ,function () {
            return this.level * 50 * this.quality;
        }
    );
    d(p, "jewelPower"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.fightPower; });
            return result;
        }
    );
    d(p, "fightPower"
        // @Cache
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        return this.equipmentSelfPower * 1.8 + this.jewelPower * 1.5;
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(level, quality) {
        this.level = 1;
        this.quality = Rare.稀有;
        this.level = level;
        this.quality = quality;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "fightPower"
        //  @Cache
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        return this.level * 10 * this.quality;
    };
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
var Property = (function () {
    function Property(name, value, isRate) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    p.getDescription = function () {
        if (this.isRate) {
            return this.name + ":+" + (this.value / 10).toFixed(2) + "%" + "\n";
        }
        else {
            return this.name + ":+" + this.value + "\n";
        }
    };
    return Property;
}());
egret.registerClass(Property,'Property');
var Properties = (function () {
    function Properties() {
        this.all = [];
    }
    var d = __define,c=Properties,p=c.prototype;
    return Properties;
}());
egret.registerClass(Properties,'Properties');
function createHeroDes(hero) {
    var container = new egret.DisplayObjectContainer();
    container.x = 220;
    container.y = 10;
    var textField = new egret.TextField();
    for (var _i = 0, _a = hero.properties.all; _i < _a.length; _i++) {
        var h = _a[_i];
        textField.text += h.getDescription();
        container.addChild(textField);
    }
    return container;
}
function createEquipmentDes(hero) {
    var container = new egret.DisplayObjectContainer();
    container.x = 220;
    container.y = 240;
    var textField = new egret.TextField();
    for (var _i = 0, _a = hero.equipments; _i < _a.length; _i++) {
        var e = _a[_i];
        for (var _b = 0, _c = e.properties.all; _b < _c.length; _b++) {
            var a = _c[_b];
            textField.text += a.getDescription();
            container.addChild(textField);
        }
    }
    return container;
}
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(heroes) {
        _super.call(this);
        for (var i = 0; i < heroes.length; i++) {
            this.addChild(createHeroDes(heroes[i]));
            this.addChild(createEquipmentDes(heroes[i]));
        }
    }
    var d = __define,c=Panel,p=c.prototype;
    return Panel;
}(egret.DisplayObjectContainer));
egret.registerClass(Panel,'Panel');
//# sourceMappingURL=Hero.js.map