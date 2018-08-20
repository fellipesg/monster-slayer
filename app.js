new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for '+ damage
            });
            if(this.checkWin())
                return;

            this.monsterAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for '+ damage
            });
            if(this.checkWin())
                return;
            
            this.monsterAttacks();
        },
        heal: function(){
            if(this.playerHealth <= 90)
                this.playerHealth += 10;
            else
                this.playerHealth = 100;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for '+ 10
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;

        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;

            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for '+ damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                swal({
                    title: 'You Won!',
                    text: "Do you want to start a new game?",
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, start it!'
                  }).then((result) => {
                    if (result.value) {
                      swal(
                        'You Won',
                        'Starting a new game!',
                        'success'
                      );
                      this.startGame();
                    } else {
                        this.gameIsRunning = false;
                    }
                  });
                return true;
            } else if(this.playerHealth <= 0) {
                swal({
                    title: 'You Lost!',
                    text: "Do you want to start a new game?",
                    type: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, start it!'
                  }).then((result) => {
                    if (result.value) {
                      swal(
                        'You Lost',
                        'Starting a new game!',
                        'error'
                      );
                      this.startGame();
                    } else {
                        this.gameIsRunning = false;
                    } return true;
                  });
            }
            return false;
        }
    }
});