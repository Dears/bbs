## bbs

##### 環境構築
* Virtual Box
* vagrant 1.7.4
  * centos7(https://github.com/holms/vagrant-centos7-box/releases/download/7.1.1503.001/CentOS-7.1.1503-x86_64-netboot.box)
* node v4.4.3
* mongoDB v3.2.6

### vagrant使い方
* vagrant up ... vagrant環境起動
* vagrant ssh ... vagrantの仮想OSにログイン
* vagrant@localhost /var/www/server内が共有フォルダ(Vagrantfileで定義)

### vagrantおまけ　参考文献
* 「Vagrantって流行ってるらしいけど何が便利なの？」　http://dev.classmethod.jp/server-side/virtual-box-vagrant/
* 「開発環境の構築・共有を簡単にするVagrant入門」　https://thinkit.co.jp/story/2015/03/19/5740

### アクセスについて
* vagrantのIPアドレス： 192.168.33.10 (Vagrantfile)
* ポート：　3000 (index.js)
* Vagrantfile内でprivate_networkにされてるので外部からのアクセス想定はなし

### MongoDB
* インストール　https://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/
* mongoDBの起動　sudo service mongod start
* 自動起動設定　sudo chkconfig mongod on

### MongoDB使い方
* DBコマンド　mongo
* 中身確認　show dbs, show collections
* DB作成　use [db名]
* Collection作成　db.createCollection("[collection名]")
* Collectionリネーム　db.[Collection名].renameCollection("[新Collection名]")
* Collection削除　db.[Collection名].drop()
* 現在の位置と情報確認　db.stats()
* 現在のいるDB削除 db.dropDatabase()
* コマンドから抜ける exit

* データ挿入 db.[collection名].insert({name:"ogawa", score:30})
* （関数も使える）
* データ全削除 db.remove({})
* データ確認　db.[collection名].find()
* データ件数確認　db.[collection名].count()
* 正規表現、{$gte gt lte lt eq ne}, distinct等使える

### エラー対処
* vagrant上でnpm installが出来ない　⇒　--no-bin-links　つける
http://eiua-memo.tumblr.com/post/117361529158/npmvagrantvagrant%E3%81%AE%E5%85%B1%E6%9C%89%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E4%B8%8A%E3%81%A7npm
