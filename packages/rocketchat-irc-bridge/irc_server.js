import net from 'net';
export function startServer() {
    let clients = [];

    let server = net.createServer((client) => {
        console.log("client connected:", client.address());
        clients.push(client);

        client.on('data', (data) => {
            console.log("irc msg:", data.toString());
        });
    });

    server.on('error', (e) => console.error("err:", e));

    server.listen(6667, () => console.log("server bound"));

    return clients;
}