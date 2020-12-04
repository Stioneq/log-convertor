const clientLogMapper = require('./client-log');
const { map } = require('./index');
describe('Client log mapper tests', () => {

    it('should map if all fields are presented', () => {
        expect(map(clientLogMapper)(
            { "type": "client", "message": "Message", "timestamp": 1518176440, "environment": "prod", "ip": "127.0.0.1", "app": "client_app", "user_id": 1 }))
            .toEqual({
                "logsource": "client",
                "program": "client_app",
                "host": "127.0.0.1",
                "env": "prod",
                "type": "INFO",
                "timestamp": "1970-01-18T13:42:56.440Z",
                "message": "Message",
                "_data": {
                  "user_id": 1
                }
              })
    })
});