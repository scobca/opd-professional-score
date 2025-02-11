FROM php:8.1-apache
RUN apt-get update && apt-get install -y libpq-dev libc-client-dev libkrb5-dev \
  && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql && a2enmod rewrite
RUN service apache2 restart
