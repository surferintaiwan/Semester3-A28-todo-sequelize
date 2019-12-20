# 待辦事項清單網站-可註冊、登入、登出
此網站以express+ Node.js + MySQL + passport完成。

## 網站截圖

## 功能說明
1. 使用者可註冊(註冊時，資料輸入有誤，皆會提示警告)
2. 使用者可登入(選擇註冊的帳號登入或以FACEBOOK登入)
3. 使用者可登出(登出後，會提示登出成功)
4. 使用者若未登入則強行自行輸入網址欲瀏覽記帳資料或新增記帳資料，則會自動跳轉至登入頁，並提示需要登入才可瀏覽

<若於登入後>

5. 首頁可瀏覽所有待辦事項
6. 可瀏覽單一待辦事項
7. 可編輯待辦事項
8. 可刪除待辦事項

## 開始使用
1. 下載本專案檔案至本地端
```
git clone https://github.com/surferintaiwan/Semester3-A28-todo-sequelize
```
2. 於終端機打開專案檔案
```
cd Semester3-A28-todo-sequelize
```
3. 於終端機安裝npm

此命令會查詢package.json看本專案使用了哪些套件，並自動安裝
```
npm install
```
4. 安裝mySQL


5. 安裝mySQL Workbench來新增一個資料庫
與本地端mySQL資料庫連接完成後，請輸入
```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```

6. 於資料庫新增User及Todo資料表
請在終端機輸入
```
npx sequelize db:migrate
```

7. 新增環境變數.env檔案

由於設置passport.facebook時，需要輸入你在facebook developer申請的app帳號跟密碼，有將之儲存在.env中，並且把.env放進.gitignore，這樣在上傳gitghub時，就不會看到環境變數。

步驟如下:
* 前往facebook developer建立應用程式
* 選擇產品為facebook登入
* 在設定頁面拿到ID跟密碼
* 在設定頁面輸入有效的OAuth重新導向URL>http://localhost:3000/auth/facebook/callback
* 請在根目錄下新增.env
* 檔案內儲存如下(記得輸入的內容不需要加上引號'')
* 將.env寫進.gitignore
```
FACEBOOK_ID=你申請的ID
FACEBOOK_SECRECT=你申請的密碼
FACEBOOK_CALLBACK=callback路徑
```

```
// 範例
FACEBOOK_ID=123456789
FACEBOOK_SECRECT=jfjfeijkmx45775
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

8. 於終端機啟用並監聽伺服器
```
nodemon app.js
```
9. 於瀏覽器輸入 [http://localhost:3000/](http://localhost:3000/) 即可開始使用建立於本地端之餐廳網站

10. 若欲停止伺服器運行，可於終端機輸入Ctrl + C ，即可停用伺服器

## 環境配置
### Web Server
* node.js > v12.12.0
### DB
* mySQL

### 套件
#### 前端美化
* jquery > 3.4.1
* bootstrap > 5.11.2
* popper
#### nodejs套件
* nodemon (監控伺服器，當有檔案更新會自動重啟伺服器)
* express (後端框架)
* express-handlebars
* method-override (from以POST送出時，可依照需求將POST改為PUT或DELETE)
* express-session (可以截取cookie資訊、幫忙產生session儲存於資料庫)
* passport (用於登入、登出驗證，要與express-session搭配使用)
* passport-local (帳密是創建於資料庫，則使用此方式驗證)
* passport-facebook (用於facebook登入驗證)
* dot-env (用於隱藏私密訊息，如上一個套件需輸入facebook app帳密，可於上傳github時隱藏)
* bcryptjs 將密碼進行雜湊處理(在註冊及登入時皆會用到)
* connect-flash(可以將值送進req.locals，供view使用)
* sequelize (連接MySQL資料庫)
* sequelize cli
* mysql2

## 專案貢獻者
[Shawn](https://github.com/surferintaiwan)