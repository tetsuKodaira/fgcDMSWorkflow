//共通で使用する変数
const f = Forguncy;
const p = Forguncy.Page;
const h = Forguncy.Helper;

//ローカルでのデバック時の本番環境時でrootを変更
const urlBase =()=>{
    let urlBase = h.SpecialPath.getBaseUrl();
    if(urlBase == '/'){
        urlBase = 'http://localhost:32580'
    };
    return urlBase;
};
const urlErrorAccessDenied = urlBase() + '/errorAccessDenied';

//現在の日時を取得
const getCurrentDateTime =()=>{
    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth()+1;
    const date = dateTime.getDate();
    const hour = dateTime.getHours();
    const min = dateTime.getMinutes();
    const sec = dateTime.getSeconds();
    const currentDateTime = year + '-' + month + '-' + date + ' ' + hour + ":" + min + ":" + sec;
    return currentDateTime;
};

//ページクラス
class Page{
    constructor(){
        this.pageName = p.getPageName();
        this.employeeZCodeLogin = p.getUserName();
    }
            
    //Z社員番号を取得
    getEmployeeZCodeLogin(){
        p.getCell('employeeZCodeLogin').setValue(this.employeeZCodeLogin);
    }

    //URLパラメーターを取得
    //URLパラメーターが不足している場合はエラー画面に移動
    getParameters(){
        const arg = new Object;
        const pair = location.search.substring(1).split('&');
        for(let i=0;pair[i];i++) {
                let kv = pair[i].split('=');
                arg[kv[0]]=kv[1];
        };
        const projectId = arg.projectId;
        const themeId = arg.themeId;
        const dbName = arg.dbName;

        if(projectId == null || themeId == null || dbName == null){
            location.href = (urlErrorAccessDenied);
        }else{
            p.getCell('projectId').setValue(projectId);
            p.getCell('themeId').setValue(themeId);
            p.getCell('dbName').setValue(dbName);
        };
    }
}

const login =()=>{
    const page = new Page();
    page.getParameters();
};