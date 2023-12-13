FROM php:8.2-fpm


RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    curl \
    vim \
    libicu-dev

# Install MySQL driver for PHP
RUN docker-php-ext-install pdo_mysql

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash \
    && apt-get install nodejs -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app/backend

COPY . .

RUN composer install

EXPOSE 8001

CMD php artisan serve --host=0.0.0.0 --port=8001

