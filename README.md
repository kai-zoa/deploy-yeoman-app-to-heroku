Yeomanで作ったWebアプリケーションをHerokuにディプロイしてみる

事前準備
-
nodejs
Grunt
Yeoman
Herokuのアカウントとツールベルト

Yeoman?
-
Webアプリケーションのテンプレを自動生成するツールです。
JavascriptのライブラリとかフロントエンドまわりはセットアップがダルいのでYeoman使うと便利。

Yeomanでアプリケーションの生成
-
では早速アプリケーションを生成してみます。

とりあえずAngularのアプリケーションとして生成するので事前にgenerator-angularをインストールします。

```bash:generator-angularのインストール
$ npm install -g generator-angular
```

```bash:アプリケーションの生成
$ mkdir deploy-yeoman-app-to-heroku
$ cd deploy-yeoman-app-to-heroku
$ yo angular
```

プロンプトでいろいろ聞かれますが今回は全部ENTER押して進んでいきます。
アプリケーションを起動します。

```bash:アプリケーションの起動
$ grunt serve
```

やったー
![Screen Shot 2015-01-07 at 1.02.29 AM.png](https://qiita-image-store.s3.amazonaws.com/0/27339/f0dfaec6-2023-790c-4804-4641f52874f4.png)

一旦Control + C で止めます。

Herokuにディプロイ
-
今度はこのおじさんをHerokuにディプロイしてやりましょう。Yoemanがgenerator-herokuを使えるようにインストールします。

```bash:generator-herokuのインストール
$ npm install -g generator-heroku
```

```:herokuの設定を生成する
$ yo heroku
[?] Do you want a separate git repository in dist/? No
   create heroku/Procfile
   create heroku/server.js
   create heroku/distpackage.json
Please add this copy task rule to your Gruntfile:
    copy: {
        dist: {
            files: [{
                expand: true,
                dest: '<%= yeoman.dist %>',
                cwd: 'heroku',
                src: '*',
                rename: function (dest, src) {
                    var path = require('path');
                    if (src === 'distpackage.json') {
                        return path.join(dest, 'package.json');
                    }
                    return path.join(dest, src);
                }
            }]
        }
    }

You're all set! Now run
        heroku apps:create
and push your dist directory with
        git subtree push --prefix dist heroku master
```


Gruntfileのcopyタスクに追記してと標準出力に書いてあるのでやります。
Gruntでheroku用にビルドしたアプリケーションをdistディレクトリに格納する設定となります。

下記が変更差分です。
https://github.com/kai-zoa/deploy-yeoman-app-to-heroku/commit/90365ca0827f5f2809c3c9344205fe9793b3d405
ここで.gitignoreの変更もしていて、これをやらないとビルドしたアプリケーションが中途半端にherokuにディプロイされてしまうので書き換えておきましょう。

準備ができたらビルドします。

```bash:ビルド
$ grunt build
```

下記を実行して http://localhost:1203/ を開けばビルド一式の動作確認もできます。

```bash:ビルドしたアプリケーションの動作確認
$ cd dist && npm install
$ node server.js
```

ではディプロイしてみます。

```bash:Herokuにディプロイ
# [heroku login]はあらかじめしておいてください。
$ heroku create deploy-yeoman-app-to-heroku # アプリケーションの名前は適当につけてください
$ git subtree push --prefix dist heroku master
```

openすればディプロイがうまくいってることを確認できます！

```bash:ディプロイされたアプリケーションを開く
$ heroku open
```
