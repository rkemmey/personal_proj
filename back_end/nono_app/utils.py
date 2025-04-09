import random
import numpy as np

def generate_nonogram(matrix):
    if not matrix:
        return "No grid"
    size = matrix.shape
    grid = grid.tolist()


    row_hints = []  # This will store the hint numbers for each row
    for row in grid:
        row_string = ''.join(map(str, row))  # Convert row to a string of '0's and '1's
        groups = row_string.split('0')  # Split the string by '0' to find groups of '1's
        
        hint_numbers = []  # This will store hint numbers for the current row
        for group in groups:
            if group:  # Ignore empty strings (caused by multiple zeros)
                hint_numbers.append(len(group))  # Count the number of '1's in the group
        
        row_hints.append(hint_numbers)  # Add the hint numbers for this row to the result

    #print(row_hints)

    # Transpose the grid: Convert rows into columns
    columns = []  # This will store the transposed grid
    for j in range(len(grid[0])):  # Loop over columns (assuming grid is not empty)
        column = []  # Create an empty column list
        for i in range(len(grid)):  # Loop over each row
            column.append(grid[i][j])  # Add the value from row `i`, column `j`
        columns.append(column)  # Add the completed column to the list

    # Compute column hints (same logic as row hints)
    col_hints = []  # This will store the hints for each column
    for col in columns:
        col_string = ''.join(map(str, col))  # Convert column to a string of '0's and '1's
        groups = col_string.split('0')  # Split by '0' to find groups of '1's
        
        hint_numbers = []  # Store hints for this column
        for group in groups:
            if group:  # Ignore empty strings (caused by multiple zeros)
                hint_numbers.append(len(group))  # Count the number of '1's in the group
        
        col_hints.append(hint_numbers)  # Add column hints to the result

    #print(col_hints)

    return {
        "size": size,
        "row_hints": row_hints,
        "column_hints": col_hints,
        "solution": grid  # Optional: You may remove this when serving the puzzle
    }

