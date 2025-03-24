body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: url('https://files.catbox.moe/zvdq86.jpeg') no-repeat center center fixed;
    background-size: cover;
    position: relative;
}

body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
}

.container {
    text-align: center;
    z-index: 1;
    position: relative;
}

.birthday-text {
    font-size: 4em;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    opacity: 0;
    transform: translateY(-50px);
    animation: landTitle 2s ease forwards, rainbowGlow 5s linear infinite;
}

@keyframes landTitle {
    0% {
        opacity: 0;
        transform: translateY(-50px);
    }
    50% {
        opacity: 0.5;
        transform: translateY(-25px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes glow {
    from {
        text-shadow: 0 0 10px #fff;
    }
    to {
        text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6;
    }
}

@keyframes rainbowGlow {
    0% {
        text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000;
    }
    16.666% {
        text-shadow: 0 0 10px #ff7f00, 0 0 20px #ff7f00, 0 0 30px #ff7f00;
    }
    33.333% {
        text-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 30px #ffff00;
    }
    50% {
        text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
    }
    66.666% {
        text-shadow: 0 0 10px #0000ff, 0 0 20px #0000ff, 0 0 30px #0000ff;
    }
    83.333% {
        text-shadow: 0 0 10px #4b0082, 0 0 20px #4b0082, 0 0 30px #4b0082;
    }
    100% {
        text-shadow: 0 0 10px #9400d3, 0 0 20px #9400d3, 0 0 30px #9400d3;
    }
}

#clock {
    color: #fff;
    font-size: 1.5em;
    margin-top: 20px;
    opacity: 0;
    animation: showClock 1s ease forwards;
    animation-delay: 5s;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
}

@keyframes showClock {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

#confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.wishes {
    color: #fff;
    font-size: 1.5em;
    margin: 20px 0;
    animation: fadeIn 2s ease-in;
    opacity: 0;
    animation: showWishes 1s ease forwards;
    animation-delay: 2s;
}

@keyframes showWishes {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.wishes p {
    margin: 10px 0;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
    opacity: 0;
    transform: translateY(20px);
    animation: landParagraph 1s ease forwards;
}

.wishes p:nth-child(1) {
    animation-delay: 2.5s;
}

.wishes p:nth-child(2) {
    animation-delay: 3s;
}

.wishes p:nth-child(3) {
    animation-delay: 3.5s;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes landParagraph {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.star {
    position: fixed;
    font-size: 2.5em;
    animation: floatStar 6s ease-in-out infinite, showStar 1s ease forwards;
    opacity: 0;
}

@keyframes floatStar {
    0%, 100% { 
        transform: translateY(0) rotate(0deg) scale(1); 
    }
    50% { 
        transform: translateY(-20px) rotate(180deg) scale(1.2); 
    }
}

@keyframes showStar {
    from { opacity: 0; }
    to { opacity: 1; }
}

.star:nth-child(1) {
    left: 5%;
    animation-delay: 0s, 4s;
    color: #FFD700; /* Gold */
}

.star:nth-child(2) {
    left: 85%;
    animation-delay: 0.5s, 4.3s;
    color: #FF69B4; /* Pink */
}

.star:nth-child(3) {
    left: 45%;
    animation-delay: 1s, 4.6s;
    color: #7DF9FF; /* Electric Blue */
}
