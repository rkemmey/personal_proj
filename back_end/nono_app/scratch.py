"""
TO DO:
- clean up puzzle logic
- create many puzzles

- submit button not working correctly, ensure talking to right puzzle
--> refreshing vite gives us a new puzzle but i didnt refresh the django server, is it doing it for me?
- put css code in a separate file, make grid bigger

- user logins to save puzzle progress
- store generated puzzles in a PostgreSQL database instead of generating them randomly every time

- puzzles are actual pictures
_________________________
api call to sudoku puzzle, displayed, able to check solution
read in icon api, convert image url to array and save in db-- models, views, urls, serializers
get an image to pixels, build nonogram from that. 
    // convert pixels to nonogram (solution)
    // make blank grid with hints
    // store solution (new api endpoint)
navbar: nonograms, sudokus, profile - react router dom
_____________________________
1.) send pixels to front end puzzle/1 endpoint 
    // verify solution box.
    // find a way that if solution is all 0s or all 1s, do not add to database
2.) read in 100 pixels to have a database get nonogram working
2.) sud / nono pages after building navbar
3.) puzzle pages: be able to filter by difficulty
4.) profile: able to see completed and saved puzzles - link to profile after login, login/signup failing CRUD 
5.) db of sudoku puzzles-- models/views
6.) debug: edit sudoku puzzle after clicked submit, swap 0 to 1 interpretation
"""
