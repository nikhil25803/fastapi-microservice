## FastAPI + Microservices
A Warehouse-Store concept-based microservice, built using Fast API, Redis, and ReactJS. Scripted in Python, JavaScript, and setup automation using shell scripting.

## Tech Stack
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Shell Script](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)

## Project Summary

[]("./img/fastapi-microservice.png)

+ ### warehouse-server
Responsible for creating products, and deciding the price and quantity of the product. One can add, list, review and delete the product created.


+ ### store-server
Responsible for creating orders, on every order placed, `20%` of the amount will be added as a tax and will update the status of the product as `pending`, or `completed`.

While placing the order, the script is also responsible to check whether the ordered amount out-numbers the available amount or not. If yes, it set the status of the product as `pending`.

All this happened in the background as a `Redis Stream`.