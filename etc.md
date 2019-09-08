# Tomcat access log
```xml
<Host name="ksmart.kohyoung.com" appBase="webapps/ksmart"
    unpackWARs="true" autoDeploy="true">
    <Alias>kohyoung.com</Alias>
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs/ksmart"
        prefix="ksmart_access_log." suffix=".txt"
    pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
```

## 패턴
```
%a - Remote IP address
%A - Local IP address
%b - Bytes sent, excluding HTTP headers, or '-' if no bytes were sent
%B - Bytes sent, excluding HTTP headers
%h - Remote host name (or IP address if enableLookups for the connector is false)
%H - Request protocol
%l - Remote logical username from identd (always returns '-')
%m - Request method
%p - Local port
%q - Query string (prepended with a '?' if it exists, otherwise an empty string
%r - First line of the request
%s - HTTP status code of the response
%S - User session ID
%t - Date and time, in Common Log Format format
%u - Remote user that was authenticated
%U - Requested URL path
%v - Local server name
%D - Time taken to process the request, in millis
%T - Time taken to process the request, in seconds
%I - current Request thread name (can compare later with stacktraces)
```

## 예시
```log
10.2.11.156 - - [29/Aug/2019:02:47:06 +0900] "POST /management/pcMngtCmd/Cmd.do HTTP/1.1" 200 268
10.2.11.156 - - [29/Aug/2019:02:48:06 +0900] "POST /management/pcMngtCmd/Cmd.do HTTP/1.1" 200 268
10.2.11.156 - - [29/Aug/2019:02:49:06 +0900] "POST /management/pcMngtCmd/Cmd.do HTTP/1.1" 200 268
10.2.11.156 - - [29/Aug/2019:02:50:07 +0900] "POST /management/pcMngtCmd/Cmd.do HTTP/1.1" 200 268
10.2.11.156 - - [29/Aug/2019:02:51:07 +0900] "POST /management/pcMngtCmd/Cmd.do HTTP/1.1" 200 268
```