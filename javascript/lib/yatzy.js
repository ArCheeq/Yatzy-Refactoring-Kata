const Yatzy = function (...dice) {
    this.dice = dice;

    this.scoreSingleValue = function (value) {
        return this.dice.reduce((sum, item) => {
            if (item === value) {
                sum += value;
            }
            return sum
        }, 0);
    }

    this.ones = () => this.scoreSingleValue(1)
    this.twos = () => this.scoreSingleValue(2)
    this.threes = () => this.scoreSingleValue(3)
    this.fours = () => this.scoreSingleValue(4)
    this.fives = () => this.scoreSingleValue(5)
    this.sixes = () => this.scoreSingleValue(6)

    this.chance = function () {
        return this.dice.reduce((total, item) => total += item, 0);
    }

    this.yatzy = function () {
        const yatzyMap = new Set(this.dice);

        if (yatzyMap.size === 1) {
            return 50
        } else {
            return 0
        }
    }

    this.countDuplicates = function () {
        const counts = [0, 0, 0, 0, 0, 0];
        this.dice.forEach(item => {
            counts[item - 1]++;
        })

        return counts;
    }

    this.scorePairs = function (pairsCount) {
        const counts = this.countDuplicates();
        let score = 0

        for (let i = counts.length - 1; i >= 0; i--) {
            if (counts[i] >= 2 && pairsCount) {
                score += (i + 1) * 2;
                pairsCount--;
            }
        }

        return pairsCount ? 0 : score;
    }

    this.someOfaKind = function(duplicateAmount) {
        const counts = this.countDuplicates();

        for (let i = 0; i < 6; i++) {
            if (counts[i] >= duplicateAmount)
                return (i+1) * duplicateAmount;
        }
        return 0;
    }

    this.isStraight = function (startIndex, endIndex) {
        const counts = this.countDuplicates();

        for (let i = startIndex; i <= endIndex; i++) {
            if (counts[i] != 1) {
                return false
            }
        }

        return true;
    }

    this.smallStraight = function () {
        const score = 15;
        const startIndex = 0;
        const endIndex = 4;

        return this.isStraight(startIndex, endIndex) ? score : 0;
    }

    this.largeStraight = function () {
        const score = 20;
        const startIndex = 1;
        const endIndex = 5;

        return this.isStraight(startIndex, endIndex) ? score : 0;
    }

    this.fullHouse = function() {
        const counts = this.countDuplicates();
        let isDouble, isTriple = false;
        let score = 0;

        for (let i = 0; i < 6; i += 1)
            if (counts[i] == 2) {
                isDouble = true;
                score += (i+1) * 2;
            } else if (counts[i] == 3) {
                isTriple = true;
                score += (i+1) * 3;
            }

        if (isDouble && isTriple)
            return score;
        else
            return 0;
    }
}

module.exports = Yatzy;


