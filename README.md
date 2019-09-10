# Tic-Tac-Toe
Tic Tac Toe game with an unbeatable AI

The AI is implemented with the Minimax Algorithm

This algorithm sees a few steps ahead and puts itself in the shoes of its opponent.
It keeps playing ahead until it reaches a terminal arrangement of the board (terminal state) resulting in a tie, a win, or a loss.
Once in a terminal state, the AI will assign an arbitrary positive score for a win, a negative score for a loss, or a neutral score for a tie.

The algorithm then evaluates the moves that lead to a terminal state based on the players’ turn.
It will choose the move with maximum score when it is the AI’s turn and choose the move with the minimum score when it is the human player’s turn.
Using this strategy, Minimax avoids losing to the human player.

 
The minimax function performs the following actions:

1. return a value if a terminal state is found (+10, 0, -10)
2. go through available spots on the board
3. call the minimax function on each available spot (using recursion)
4. evaluate returning values from function calls
5. return the best value

This game is made with JavaScript and styled with HTML & CSS
The minimax algorithm is taken from [this article](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/)
