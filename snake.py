import pygame
import random
import time
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 800
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Snakes and Ladders")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
ORANGE = (255, 165, 0)
PURPLE = (128, 0, 128)

# Fonts
font = pygame.font.SysFont("comicsans", 40)

# Board setup
ROWS, COLS = 10, 10
CELL_SIZE = WIDTH // COLS

# Player positions
player1_pos = 0
player2_pos = 0

# Snakes and Ladders
snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
}

ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
}

# Dice
dice_value = 1
dice_rolling = False
dice_animation_frames = [1, 2, 3, 4, 5, 6]

# Function to draw the board
def draw_board():
    screen.fill(WHITE)
    for row in range(ROWS):
        for col in range(COLS):
            x = col * CELL_SIZE
            y = row * CELL_SIZE
            rect = pygame.Rect(x, y, CELL_SIZE, CELL_SIZE)
            pygame.draw.rect(screen, BLACK, rect, 1)

            # Calculate cell number
            cell_number = row * COLS + col + 1 if row % 2 == 0 else (row + 1) * COLS - col
            text = font.render(str(cell_number), True, BLACK)
            text_rect = text.get_rect(center=(x + CELL_SIZE // 2, y + CELL_SIZE // 2))
            screen.blit(text, text_rect)

# Function to draw players
def draw_players():
    # Player 1 (Red)
    row1, col1 = get_row_col(player1_pos)
    pygame.draw.circle(screen, RED, (col1 * CELL_SIZE + CELL_SIZE // 2, row1 * CELL_SIZE + CELL_SIZE // 2), 20)

    # Player 2 (Blue)
    row2, col2 = get_row_col(player2_pos)
    pygame.draw.circle(screen, BLUE, (col2 * CELL_SIZE + CELL_SIZE // 2, row2 * CELL_SIZE + CELL_SIZE // 2), 20)

# Function to get row and column from position
def get_row_col(pos):
    if pos == 0:
        return ROWS - 1, 0
    row = (pos - 1) // COLS
    col = (pos - 1) % COLS
    if row % 2 != 0:
        col = COLS - 1 - col
    return ROWS - 1 - row, col

# Function to roll the dice
def roll_dice():
    return random.randint(1, 6)

# Function to animate dice rolling
def animate_dice():
    global dice_rolling, dice_value
    dice_rolling = True
    for _ in range(10):  # Number of frames for animation
        dice_value = random.choice(dice_animation_frames)
        draw_dice()
        pygame.display.flip()
        time.sleep(0.1)
    dice_value = roll_dice()
    dice_rolling = False

# Function to draw dice
def draw_dice():
    dice_rect = pygame.Rect(WIDTH - 150, HEIGHT - 150, 100, 100)
    pygame.draw.rect(screen, BLACK, dice_rect)
    dice_text = font.render(str(dice_value), True, WHITE)
    text_rect = dice_text.get_rect(center=dice_rect.center)
    screen.blit(dice_text, text_rect)

# Function to draw snakes and ladders
def draw_snakes_and_ladders():
    for start, end in snakes.items():
        start_row, start_col = get_row_col(start)
        end_row, end_col = get_row_col(end)
        start_x = start_col * CELL_SIZE + CELL_SIZE // 2
        start_y = start_row * CELL_SIZE + CELL_SIZE // 2
        end_x = end_col * CELL_SIZE + CELL_SIZE // 2
        end_y = end_row * CELL_SIZE + CELL_SIZE // 2
        pygame.draw.line(screen, GREEN, (start_x, start_y), (end_x, end_y), 5)

    for start, end in ladders.items():
        start_row, start_col = get_row_col(start)
        end_row, end_col = get_row_col(end)
        start_x = start_col * CELL_SIZE + CELL_SIZE // 2
        start_y = start_row * CELL_SIZE + CELL_SIZE // 2
        end_x = end_col * CELL_SIZE + CELL_SIZE // 2
        end_y = end_row * CELL_SIZE + CELL_SIZE // 2
        pygame.draw.line(screen, ORANGE, (start_x, start_y), (end_x, end_y), 5)

# Function to handle player movement
def move_player(player_pos, steps):
    new_pos = player_pos + steps
    if new_pos > 100:
        return player_pos
    return new_pos

# Function to check for snakes and ladders
def check_snakes_and_ladders(pos):
    if pos in snakes:
        print(f"Snake! Moved from {pos} to {snakes[pos]}")
        return snakes[pos]
    if pos in ladders:
        print(f"Ladder! Moved from {pos} to {ladders[pos]}")
        return ladders[pos]
    return pos

# Main game loop
def main():
    global player1_pos, player2_pos, dice_value, dice_rolling

    running = True
    current_player = 1

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            if event.type == pygame.MOUSEBUTTONDOWN and not dice_rolling:
                mouse_pos = pygame.mouse.get_pos()
                dice_rect = pygame.Rect(WIDTH - 150, HEIGHT - 150, 100, 100)
                if dice_rect.collidepoint(mouse_pos):
                    animate_dice()

                    if current_player == 1:
                        player1_pos = move_player(player1_pos, dice_value)
                        player1_pos = check_snakes_and_ladders(player1_pos)
                        if player1_pos == 100:
                            print("Player 1 wins!")
                            running = False
                    else:
                        player2_pos = move_player(player2_pos, dice_value)
                        player2_pos = check_snakes_and_ladders(player2_pos)
                        if player2_pos == 100:
                            print("Player 2 wins!")
                            running = False

                    # Switch players
                    current_player = 2 if current_player == 1 else 1

        # Draw the board, players, snakes, ladders, and dice
        draw_board()
        draw_snakes_and_ladders()
        draw_players()
        draw_dice()

        pygame.display.flip()

    pygame.quit()

if __name__ == "__main__":
    main()