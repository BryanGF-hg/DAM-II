PHP se puede configurar
/etc/php/8.3/apache2/php.ini

sudo nano /etc/php/8.3/apache2/php.ini

o bien editarlo con gedit

error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
display_errors = On

sudo service apache2 restart

analizar el access.log
analizar el error.log

/var/log/apache2/access.log

PHP en Ubuntu no lleva SQLite incorporado:
sudo apt install php-sqlite3
