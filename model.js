
var app = new Vue({
    el: '#mainpage',
    data: {
        character: {
            title: "Generic Person",
            label: "The person",
            size: "Medium",
            type: "Humanoid (any race)",
            alignment: "any alignment",
            ac: 10,
            armour: "unarmoured",
            hp: "1d8 + 8 + ##CONMOD##",
            speed: "30",
            proficiency: 2,
            attributes: {
                str: 10,
                dex: 10,
                con: 10,
                int: 10,
                wis: 10,
                cha: 10
            },
            saves: {
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                cha: 0
            },
            skills: {
                athletics: 0,
                acrobatics: 0,
                sleightOfHand: 0,
                stealth: 0,
                arcana: 0,
                history: 0,
                investigation: 0,
                nature: 0,
                religion: 0,
                animalHandling: 0,
                insight: 0,
                medicine: 0,
                perception: 0,
                survival: 0,
                deception: 0,
                intimidation: 0,
                performance: 0,
                persuasion: 0
            },
            damageResistances: "",
            damageImmunities: "",
            conditionImmunities: "",
            sense: {
                darkvision: 0,
                blindsight: 0,
                truevision: 0,
                tremorsense: 0
            },
            languages: "Common",
            specials: [],
            actions: [],
            legendaryActions: [],
            reactions: []
        },
        library: {
            sizes: [
                "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"
            ],
            specials: [
                {
                    title: "Keen Senses",
                    desciption: "##LABEL## has advantage on Wisdom (Perception) checks that rely on smell."
                }, {
                    title: "Keen Sight",
                    desciption: "##LABEL## has advantage on Wisdom (Perception) checks that rely on sight."
                }, {
                    title: "Keen Smell",
                    desciption: "##LABEL## has advantage on Wisdom (Perception) checks that rely on smell."
                }, {
                    title: "Pack Tactics",
                    description: "##LABEL## has advantage on an attack roll against a creature if at least one of ##LABEL##'s allies is within 5 feet of them and the ally isn't incapacitated"
                }, {
                    title: "Multiattack",
                    desciption: "##LABEL## makes two melee attacks."
                },{
                    title: "Uncanny Dodge",
                    description: "##LABEL## halves the damage that it takes from an attack that hits it. ##LABEL## must be able to see the attacker."
                }
            ],
            weapons: [
                {
                    title: "Club",
                    description: "Melee Weapon Attack: ##DEXPROFMOD## to hit, reach 5 ft., one target. Hit: \\dice{1d4 + ##STRMOD##} bludgeoning damage."
                }, {
                    title: "Dagger",
                    description: "Melee or Ranged Weapon Attack: ##DEXPROFMOD## to hit, reach 5 ft. or range 20/60 ft., one target. Hit: \\dice{1d4 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Greataxe",
                    description: "Melee Weapon Attack: ##STRPROFMOD## to hit, reach 5 ft., one target. Hit: \\dice{1d12 + ##STRMOD##} slashing damage."
                }, {
                    title: "Heavy Crossbow",
                    description: " Ranged Weapon Attack: ##DEXPROFMOD## to hit, range 100 ft/400 ft., one target. Hit: \\dice{1d10 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Hand Crossbow",
                    description: " Ranged Weapon Attack: ##DEXPROFMOD## to hit, range 30 ft/120 ft., one target. Hit: \\dice{1d6 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Heavy Crossbow",
                    description: " Ranged Weapon Attack: ##DEXPROFMOD## to hit, range 100 ft/400 ft., one target. Hit: \\dice{1d10 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Light Crossbow",
                    description: " Ranged Weapon Attack: ##DEXPROFMOD## to hit, range 80 ft/320 ft., one target. Hit: \\dice{1d8 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Longbow",
                    description: "Ranged Weapon Attack: ##DEXPROFMOD## to hit, ranged 150 ft/600 ft., one target. Hit: \\dice{1d8 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Mace",
                    description: "Melee Weapon Attack: ##STRPROFMOD## to hit, reach 5 ft., one target. Hit: \\dice{1d6 + ##STRMOD#} bludgeoning damage."
                }, {
                    title: "Quarterstaff",
                    description: "Melee Weapon Attack: ##STRPROFMOD## to hit, reach 5 ft., one target. Hit : \\dice{1d6 + ##STRMOD##} bludgeoning damage, or \\dice{1d8 + ##STRMOD##} bludgeoning damage if used with two hands."
                }, {
                    title: "Rapier",
                    description: "Melee Weapon Attack: ##DEXPROFMOD## to hit, reach 5 ft., one target. Hit: \\dice{1d8 + ##DEXMOD##} piercing damage."
                }, {
                    title: "Shortsword",
                    description: "Melee Weapon Attack: ##STRPROFMOD## to hit, reach 5 ft. or range 20 ft/60 ft., one target. Hit: \\dice{1d6 + ##STRMOD##} piercing damage."
                }, {
                    title: "Spear",
                    description: "Melee or Ranged Weapon Attack: ##STRPROFMOD## to hit, reach 5 ft. or range 20ft/60 ft., one target. Hit: \\dice{1d6 + ##STRMOD##} piercing damage."
                }
            ]
        }
    },
    methods: {
        statModifier: function (stat) {
            return Math.floor((stat - 10) / 2);
        },
        skillString: function (statName, statScore) {
            let statString = "";
            if (statScore > 0) {
                statString = "\n  " + statName + " +" + statScore + ", ";
            } else if (statScore < 0) {
                statString = "\n  " + statName + " " + statScore + ", ";
            }
            return statString;
        },
        senseString: function (senseName, senseRadius) {
            let senseString = "";
            if (senseRadius > 0) {
                statString = "\n  " + senseName + " " + senseRadius + "ft." + ", ";
            }
            return senseString;
        },
        parseForKeyWords: function (target) {
            let keywords = {
                '##STRMOD##': this.statModifier(this.character.attributes.str),
                '##DEXMOD##': this.statModifier(this.character.attributes.dex),
                '##CONMOD##': this.statModifier(this.character.attributes.con),
                '##INTMOD##': this.statModifier(this.character.attributes.int),
                '##WISMOD##': this.statModifier(this.character.attributes.wis),
                '##CHAMOD##': this.statModifier(this.character.attributes.cha),
                '##STRPROFMOD##': this.statModifier(this.character.attributes.str) + this.proficiency,
                '##DEXPROFMOD##': this.statModifier(this.character.attributes.dex) + this.proficiency,
                '##CONPROFMOD##': this.statModifier(this.character.attributes.con) + this.proficiency,
                '##INTPROFMOD##': this.statModifier(this.character.attributes.int) + this.proficiency,
                '##WISPROFMOD##': this.statModifier(this.character.attributes.wis) + this.proficiency,
                '##CHAPROFMOD##': this.statModifier(this.character.attributes.cha) + this.proficiency,
                '##STR##': this.character.attributes.str,
                '##DEX##': this.character.attributes.dex,
                '##CON##': this.character.attributes.con,
                '##INT##': this.character.attributes.int,
                '##WIS##': this.character.attributes.wis,
                '##CHA##': this.character.attributes.cha,
                '##LABEL##': this.character.label
            }
            for (keyword in keywords) {
                target = target.split(keyword).join(keywords[keyword]);
            }
            return target;
        },
        randomWeapon: function() {  
            return this.library.weapons[~~(this.library.weapons.length * Math.random())]
        },
        setStat: function (statLabel="stat", statField) {
            swal("Enter new ${statLabel} value", {
                content: "input",
              })
              .then((value) => {
                swal(`Set ${statLabel} to: ${value}`);
              });
        }
        
    },
    computed: {
        hasSkills: function () {
            for (skill in this.character.skills) {
                if (this.character.skills[skill] > 0) {
                    return true;
                }
            }
            return false;
        },
        hasSaves: function () {
            for (save in this.character.saves) {
                if (this.character.saves[save] > 0) {
                    return true;
                }
            }
            return false;
        },
        latexBlob: function () {
            let latexString = "";
            latexString += "\\begin{monsterbox}{" + this.character.title + "}";
            latexString += "\n\\textit{" + this.character.size + " " + this.character.type + ", " + this.character.alignment + "}\\\\";
            latexString += "\n\\hline%";
            latexString += "\n\\basics[%";
            latexString += "\n  armorclass = " + this.character.ac + " (" + this.character.armour + "),";
            latexString += "\n  hitpoints  = {\\dice{" + this.parseForKeyWords(this.character.hp) + "}},";
            latexString += "\n  speed      = " + this.character.speed + " ft";
            latexString += "\n]";
            latexString += "\n\\hline%";
            latexString += "\n\\stats[";
            latexString += "\n  STR = \\stat{" + this.character.attributes.str + "},";
            latexString += "\n  DEX = \\stat{" + this.character.attributes.dex + "},";
            latexString += "\n  CON = \\stat{" + this.character.attributes.con + "},";
            latexString += "\n  INT = \\stat{" + this.character.attributes.int + "},";
            latexString += "\n  WIS = \\stat{" + this.character.attributes.wis + "},";
            latexString += "\n  CHA = \\stat{" + this.character.attributes.cha + "}";
            latexString += "\n]";
            latexString += "\n\\hline%";
            latexString += "\n\\details[%";
            if (this.hasSaves) {
                latexString += "\n\\saves = {";
                latexString += "\n  STR = \\stat{" + this.character.saves.str + "},";
                latexString += "\n  DEX = \\stat{" + this.character.saves.dex + "},";
                latexString += "\n  CON = \\stat{" + this.character.saves.con + "},";
                latexString += "\n  INT = \\stat{" + this.character.saves.int + "},";
                latexString += "\n  WIS = \\stat{" + this.character.saves.wis + "},";
                latexString += "\n  CHA = \\stat{" + this.character.saves.cha + "}";
                latexString += "\n}";
            }
            if (this.hasSkills) {
                latexString += "\nskills = {";
                latexString += this.skillString("Acrobatics", this.character.skills.acrobatics);
                latexString += this.skillString("Athletics", this.character.skills.athletics);
                latexString += this.skillString("Sleight of Hand", this.character.skills.sleightOfHand);
                latexString += this.skillString("Stealth", this.character.skills.stealth);
                latexString += this.skillString("Arcana", this.character.skills.arcana);
                latexString += this.skillString("History", this.character.skills.history);
                latexString += this.skillString("Investigation", this.character.skills.investigation);
                latexString += this.skillString("Nature", this.character.skills.nature);
                latexString += this.skillString("Religion", this.character.skills.religion);
                latexString += this.skillString("Animal Handling", this.character.skills.animalHandling);
                latexString += this.skillString("Insight", this.character.skills.insight);
                latexString += this.skillString("Medicine", this.character.skills.medicine);
                latexString += this.skillString("Perception", this.character.skills.perception);
                latexString += this.skillString("Survival", this.character.skills.survival);
                latexString += this.skillString("Deception", this.character.skills.deception);
                latexString += this.skillString("Intimidation", this.character.skills.intimidation);
                latexString += this.skillString("Performance", this.character.skills.performance);
                latexString += this.skillString("Persuasion", this.character.skills.persuasion);
                latexString += "\n}";
            }
            latexString += "\n  senses = {";
            latexString += this.senseString("Darkvision", this.character.sense.darkvision);
            latexString += this.senseString("Blindsight", this.character.sense.blindsight);
            latexString += this.senseString("Truevision", this.character.sense.truevision);
            latexString += this.senseString("Tremorsense", this.character.sense.tremorsense);
            latexString += "passive perception " + (10+this.statModifier(this.character.attributes.wis)) + "},";
            if (this.character.damageResistances.length > 0) {
                latexString += "\n  damageresistances = {" + this.character.damageResistances + "},";
            }
            if (this.character.damageImmunities.length > 0) {
                latexString += "\n  damageimmunities = {" + this.character.damageImmunities + "},";
            }
            if (this.character.conditionImmunities.length > 0) {
                latexString += "\n  conditionimmunities = {" + this.character.conditionImmunities + "},";
            }
            latexString += "\n  languages = {" + this.character.languages + "},";
            latexString += "\n]";
            latexString += "\n\\hline \\\\[1mm]";
            if (this.character.specials.length > 0) {
                this.character.specials.forEach(element => {
                    latexString += "\n\\begin{monsteraction}[" + element.title + "] " + this.parseForKeyWords(element.description);
                    latexString += "\\end{monsteraction}";
                });
                latexString += "\n\\hline \\\\[1mm]";
            }

            if (this.character.actions.length > 0) {
                latexString += "\n\\monstersection{Actions}";
                this.character.actions.forEach(element => {
                    latexString += "\n\\begin{monsteraction}[" + element.title + "] " + this.parseForKeyWords(element.description);
                    latexString += "\\end{monsteraction}";
                });
                latexString += "\n\\hline \\\\[1mm]";
            }

            if (this.character.legendaryActions.length > 0) {
                latexString += "\n\\monstersection{Legendary Actions}";
                this.character.legendaryActions.forEach(element => {
                    latexString += "\n\\begin{monsteraction}[" + element.title + "] " + this.parseForKeyWords(element.description);
                    latexString += "\\end{monsteraction}";
                });
                latexString += "\n\\hline \\\\[1mm]";
            }

            if (this.character.reactions.length > 0) {
                latexString += "\n\\monstersection{Reactions}";
                this.character.reactions.forEach(element => {
                    latexString += "\n\\begin{monsteraction}[" + element.title + "] " + this.parseForKeyWords(element.description);
                    latexString += "\\end{monsteraction}";
                });
                latexString += "\n\\hline \\\\[1mm]";
            }
            latexString += "\n\\end{monsterbox}";

            return latexString;
        }
    }
});