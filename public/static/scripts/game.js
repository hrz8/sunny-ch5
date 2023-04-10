class Player {
    constructor() {
        this.score = 0;
        this.win = null;
        this.selected = null;
    }

    reset() {
        this.win = null;
        this.selected = null;
    }

    resetScore() {
        this.score = 0;
    }
}

class Game {
    constructor(players) {
        if (this.constructor === Game) {
            throw new Error('this is abstraction class');
        }
        this.players = players;
    }

    reset() {
        for (const player of players) {
            player.resetScore();
        }
    }
}

class User extends Player {
    constructor() {
        super();
    }

    choose(choice) {
        this.selected = choice;
    }
}

class Computer extends Player {
    constructor() {
        super();
    }

    roll(elements) {
        const choices = Object.values(RockPaperScissor.choices);
        const randomIdx = Math.floor(Math.random() * choices.length)
        this.selected = choices[randomIdx];

        elements.forEach(function(el) {
            el.classList.remove('active');

            if (el.dataset.choice === choices[randomIdx]) {
                el.classList.add('active');
            }
        });
    }
}

class RockPaperScissor extends Game {
    static choices = {
        ROCK: 'rock',
        PAPER: 'paper',
        SCISSOR: 'scissor',
    };

    constructor(user, computer) {
        super([
            user,
            computer,
        ]);
    }

    userTurn(choice) {
        this.players[0].choose(choice);
    }

    computerTurn(elements, result) {
        const interval = setInterval(() => {
            this.players[1].roll(elements);
        }, 100);

        
        setTimeout(() => {
            clearInterval(interval);

            this.#determineResult();
        }, 2000);
    }

    #determineResult() {
        if (
            this.players[0].selected !== null &&
            this.players[1].selected !== null
        ) {
            const [user, comp] = this.players;
            const computerWins =
                (
                    user.selected === RockPaperScissor.choices.ROCK &&
                    comp.selected === RockPaperScissor.choices.PAPER
                ) ||
                (
                    user.selected === RockPaperScissor.choices.PAPER &&
                    comp.selected === RockPaperScissor.choices.SCISSOR
                ) ||
                (
                    user.selected === RockPaperScissor.choices.SCISSOR &&
                    comp.selected === RockPaperScissor.choices.ROCK
                );

            const userWins =
                (
                    user.selected === RockPaperScissor.choices.ROCK &&
                    comp.selected === RockPaperScissor.choices.SCISSOR
                ) ||
                (
                    user.selected === RockPaperScissor.choices.PAPER &&
                    comp.selected === RockPaperScissor.choices.ROCK
                ) ||
                (
                    user.selected === RockPaperScissor.choices.SCISSOR &&
                    comp.selected === RockPaperScissor.choices.PAPER
                );

            document.getElementById('vs').style.display = 'none';

            if (computerWins) {
                comp.score++;
                comp.win = true;
                user.win = false;

                document.getElementById('computer-wins').style.display = 'block';
            } else if (userWins) {
                user.score++;
                user.win = true;
                comp.win = false;

                document.getElementById('user-wins').style.display = 'block';
            } else {
                document.getElementById('draw').style.display = 'block';
            }

            console.log(user.score, computer.score);
        }
    }
}

const user = new User();
const computer = new Computer();

const rps = new RockPaperScissor(user, computer);

const buttonsRpsUser = document.querySelectorAll('#user .choice');
const buttonsRpsComp = document.querySelectorAll('#computer .choice');
const resetBtn = document.getElementById('reset-btn');

buttonsRpsUser.forEach(function(el) {
    el.addEventListener('click', function() {
        buttonsRpsUser.forEach(function(ele) {
            ele.setAttribute('disabled', '');
        });
    
        el.classList.add('active');

        rps.userTurn(el.dataset.choice);
        rps.computerTurn(buttonsRpsComp);
    });
});

resetBtn.addEventListener('click', function() {
    buttonsRpsUser.forEach(function(el) {
        el.classList.remove('active');
        el.removeAttribute('disabled');
    });
    buttonsRpsComp.forEach(function(el) {
        el.classList.remove('active');
    });

    document.getElementById('vs').style.display = 'block';
    document.getElementById('computer-wins').style.display = 'none';
    document.getElementById('user-wins').style.display = 'none';
    document.getElementById('draw').style.display = 'none';
});
