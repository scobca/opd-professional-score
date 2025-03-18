FROM docker.elastic.co/elasticsearch/elasticsearch:8.2.0
RUN curl -L -o /usr/share/elasticsearch/lucene-backward-codecs.jar https://repo1.maven.org/maven2/org/apache/lucene/lucene-backward-codecs/8.6.3/lucene-backward-codecs-8.6.3.jar
RUN chown elasticsearch:elasticsearch /usr/share/elasticsearch/lucene-backward-codecs.jar
