# React-Laravel Product Management

Basic authentication and registration are included, along with the ability to input items through a CSV file and list them. It uses Laravel as a backend API service, and has a React single page application in the front end.

## Table of Contents

### Prerequisites

 - PHP > 7.3
 - Composer
 - Node Js


### Installation

Clone the repository: git clone https://github.com/naseefameer/product-management.git

Create .env file and fill out using the .env.example file as a template (both backend and frontend)

Install composer dependencies using: composer install

Run: 

- php artisan key:generate
- php artisan migrate

Install NPM dependencies:

- cd react
- npm install

### Usage

Start the development server:

- php artisan serve
- cd react && npm run dev
