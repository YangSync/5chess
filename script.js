const canvas = document.getElementById('gomoku-board');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

const boardSize = 18; // 棋盤大小
const cellSize = 35;

// 繪製棋盤格子
function drawBoard() {
    ctx.fillStyle = 'burlywood';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    for (let i = 1; i < boardSize + 2; i++) {
        const position = i * cellSize;

        // 繪製橫線
        ctx.beginPath();
        ctx.moveTo(35, position);
        ctx.lineTo(665, position);
        ctx.stroke();

        // 繪製縱線
        ctx.beginPath();
        ctx.moveTo(position, 35);
        ctx.lineTo(position, 665);
        ctx.stroke();
    }

    ctx.fillStyle = '#000000'
    for (i = 4; i <= 16; i += 6) {
        ctx.beginPath();
        ctx.arc(i * 35, 4 * 35, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(i * 35, 10 * 35, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(i * 35, 16 * 35, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
    }

}

function print_arr() {
    let output = '';
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 19; j++) {
            output += arr[j][i];
        }
        output += '\n';
    }
    console.log(output);
}

function judge(x, y, player) {
    let w = 0;
    let b = 0;
    let i, j, i2, j2, x2, y2;
    console.log(`x=${x},y=${y}`);
    if (player == true) {
        player_num = 1;
    }
    else {
        player_num = 2;
    }
    if (x - 4 <= 0) {
        i = 0;
    }
    else {
        i = x - 4;
    }
    if (y - 4 <= 0) {
        j = 0;
    }
    else {
        j = y - 4;
    }
    i2 = i; j2 = j;

    if (x + 4 >= 18) {
        x2 = 18;
    }
    else {
        x2 = x + 4;
    }
    if (y + 4 >= 18) {
        y2 = 18;
    }
    else {
        y2 = y + 4;
    }

    for (; i <= x2; i++) {    //判斷是否連成橫線
        if (arr[i][y] == 1) {
            b = 0;
            w++;
            if (w == 5) {
                return 1;
            }
        }
        else if (arr[i][y] == 2) {
            w = 0;
            b++;
            if (b == 5) {
                return 2;
            }
        }
        else {
            w = 0;
            b = 0;
        }

    }
    w = 0; b = 0;
    for (; j <= y2; j++) {    //判斷是否連成直線
        if (arr[x][j] == 1) {
            b = 0;
            w++;
            if (w == 5) {
                return 1;
            }
        }
        else if (arr[x][j] == 2) {
            w = 0;
            b++;
            if (b == 5) {
                return 2;
            }
        }
        else {
            w = 0;
            b = 0;
        }

    }
    w = 0; b = 0;

    //左上右下
    let t = 0, pi = -1, pj = -1;
    let en = 1;
    i = x; j = y;
    while (1) {

        if (en == 1 && arr[i][j] == player_num) {
            t++;
            if (t == 5) {
                return player_num;
            }
            i = i + pi;
            j = j + pj;
            if (i == -1 || j == -1 || i == 19 || j == 19) {
                en = 0;
            }
        }
        else {
            en = true;
            if (pi == 1) {
                break;
            }
            i = x + 1;
            j = y + 1;
            if (i >= 19 || j > 18) {
                break;
            }
            pi = 1;
            pj = 1;
        }
    }
    //右上左下
    t = 0, pi = 1, pj = -1;
    en = 1;
    i = x; j = y;
    while (1) {
        if (en == 1 && arr[i][j] == player_num) {
            t++;
            if (t == 5) {
                return player_num;
            }
            i = i + pi;
            j = j + pj;
            if (i < 0 || j < 0 || i >= 19 || j >= 19) {
                en = 0;
            }
        }
        else {
            en = true;
            if (pi == -1) {
                break;
            }
            i = x - 1;
            j = y + 1;
            if (i < 0 || j > 18) {
                break;
            }
            pi = -1;
            pj = 1;
        }
    }

}

drawBoard();

let arr = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


let player = true;  //true=1=white false=2=black
let winner = 0;

canvas.addEventListener('click', (event) => {
    if (player == true) {
        ctx.fillStyle = 'white';
    }
    else {
        ctx.fillStyle = 'black';
    }

    let x = event.pageX;
    let y = event.pageY;
    //console.log(`${x},${y}`);
    x = Math.floor(x / 35) * 35;
    y = Math.floor(y / 35) * 35;
    console.log(`x=${x / 35 - 1} , y=${y / 35 - 1}`);
    if (x / 35 - 1 < 0 || y / 35 - 1 < 0 || arr[x / 35 - 1][y / 35 - 1] != 0 || (x / 35 - 1) > 18 || (y / 35 - 1) > 18) {
        alert('不可放置');
        return;
    }
    if (player == true) {
        arr[x / 35 - 1][y / 35 - 1] = 1;
    }
    else {
        arr[x / 35 - 1][y / 35 - 1] = 2;
    }
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill()
    player = !player;
    if (player == true) {
        document.getElementById('whos_turn').innerHTML = 'turn white';
    }
    else {
        document.getElementById('whos_turn').innerHTML = 'turn black';
    }
    winner = judge(x / 35 - 1, y / 35 - 1, !player);
    if (winner == 1) {
        alert('white win');
        window.location.reload();
    }
    else if (winner == 2) {
        alert('black win');
        window.location.reload();
    }
    else {
        ;
    }
    //print_arr();
})