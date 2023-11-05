const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    let listData = [];
    const listDataPath = path.join(__dirname, '..', 'web', 'data','data.json');

    fs.access(listDataPath, fs.constants.R_OK, (err) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (err) {
            res.end(JSON.stringify({ success: false, error: e.message }));
            return;
        }

        fs.readFile(listDataPath, 'utf-8', (err, data) => {
            if (err) {
                res.end(JSON.stringify({ success: false, error: e.message }));
                return;
            }
            try {
                listData = JSON.parse(data);
                const result = JSON.stringify({ success: true, data: listData });
                console.log(`图片数据列表：${result}`);
                res.end(result);
            } catch (e) {
                res.end(JSON.stringify({ success: false, error: e.message }));
                return;
            }
        });
    });
}