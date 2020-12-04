
const {convert} = require('./client-log');
xdescribe('Client log convertor tests', () => {
    describe('Convert', () => {
        it('should correctly convert the empty client log', () => {
            expect(convert("{}")).toEqual({data: {}, type: "client"});
        });
        it('should correctly convert the client log', () => {
            expect(convert(`{"type": "client", "message": "Message", "timestamp": 1518176440, "environment": "prod", "ip": "127.0.0.1", "app": "client_app", "user_id": 1}`))
            .toEqual({data: {}, type: "client"});
        });
    });
});

