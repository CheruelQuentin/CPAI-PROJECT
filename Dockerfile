FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD root
ADD setup.sql /docker-entrypoint-initdb.d/setup.sql
EXPOSE 3306