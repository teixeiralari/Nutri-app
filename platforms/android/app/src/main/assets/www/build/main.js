webpackJsonp([6],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WordpressService = /** @class */ (function () {
    function WordpressService(http) {
        this.http = http;
    }
    WordpressService.prototype.getRecentPosts = function (page) {
        if (page === void 0) { page = 1; }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* wordpress_rest_API_url */] + 'posts?page=' + page)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getAuthor = function (author) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* wordpress_rest_API_url */] + "users/" + author)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getCategory = function (category) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* wordpress_rest_API_url */] + "categories/" + category)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getPostCategories = function (post) {
        var _this = this;
        var observableBatch = [];
        post.categories.forEach(function (category) {
            observableBatch.push(_this.getCategory(category));
        });
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].forkJoin(observableBatch);
    };
    WordpressService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], WordpressService);
    return WordpressService;
}());

//# sourceMappingURL=wordpress.service.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DicasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__post_post__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DicasPage = /** @class */ (function () {
    function DicasPage(navCtrl, navParams, fire, toastCrtl, loadingCtrl, wordpressservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toastCrtl = toastCrtl;
        this.loadingCtrl = loadingCtrl;
        this.wordpressservice = wordpressservice;
        this.posts = new Array();
        this.morePagesAvailable = true;
    }
    DicasPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.morePagesAvailable = true;
        if (!(this.posts.length > 0)) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.wordpressservice.getRecentPosts()
                .subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var post = data_1[_i];
                    post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "<p>";
                    _this.posts.push(post);
                }
                loading_1.dismiss();
            });
        }
    };
    DicasPage.prototype.logout = function () {
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.signOut();
        toast.setMessage('Logout com sucesso!');
        toast.present();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    DicasPage.prototype.btn_allpost = function (event, post) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__post_post__["a" /* PostPage */], {
            item: post
        });
    };
    DicasPage.prototype.doInfinite = function (infinitScroll) {
        var _this = this;
        var page = (Math.ceil(this.posts.length / 10)) + 1;
        var loading = true;
        this.wordpressservice.getRecentPosts(page)
            .subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var post = data_2[_i];
                if (!loading) {
                    infinitScroll.complete();
                }
                _this.posts.push(post);
                loading = false;
            }
        }, function (err) {
            _this.morePagesAvailable = false;
        });
    };
    DicasPage.prototype.doRefresh = function (refresher) {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    DicasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dicas',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/dicas/dicas.html"*/'<!--\n  Generated template for the DicasPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Últimas dicas</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="logout()">\n        <ion-icon class="toolbar-icon" name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-refresher\n    (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" refreshingSpinner="circles">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let post of posts">\n    <div>\n        <img [src]="post.better_featured_image.source_url"/>\n    </div>\n\n    <ion-card-content>\n      <ion-card-title [innerHTML]="post.title.rendered">\n      </ion-card-title>\n        <p [innerHTML]="post.excerpt.rendered">\n        </p>\n    </ion-card-content>\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="primary" icon-start>\n          {{ post.date.split(\'T\')[0] | date: \'d MMM, y\'}}\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button small color="primary" icon-start (click)="btn_allpost($event, post)">\n          Leia mais\n        </button>\n      </ion-col>\n    </ion-row>\n</ion-card>\n\n<ion-infinite-scroll [enabled]="morePagesAvailable"\n  (ionInfinite)="doInfinite($event)">\n  <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Carregando">\n  </ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/dicas/dicas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__["a" /* WordpressService */]])
    ], DicasPage);
    return DicasPage;
}());

//# sourceMappingURL=dicas.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, fire, toastCrtl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toastCrtl = toastCrtl;
        this.fotoPerfil = false;
        this.facebook = {
            nome: '',
            fotourl: ''
        };
        this.email = fire.auth.currentUser.email;
        this.facebook.nome = fire.auth.currentUser.displayName;
        this.facebook.fotourl = fire.auth.currentUser.photoURL;
        if (this.facebook.fotourl == null) {
            this.fotoPerfil = false;
        }
        else {
            this.fotoPerfil = true;
        }
    }
    ProfilePage.prototype.logout = function () {
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.signOut();
        toast.setMessage('Logout com sucesso!');
        toast.present();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/profile/profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Meu perfil</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="logout()">\n        <ion-icon class="toolbar-icon" name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item *ngIf="fotoPerfil">\n    <ion-thumbnail item-start>\n      <img src="{{ facebook.fotourl}}">\n    </ion-thumbnail>\n    <h2>{{ facebook.nome}}</h2>\n    <p>{{ email}}</p>\n    <button ion-button clear item-end>View</button>\n</ion-item>\n<ion-item *ngIf="!fotoPerfil">\n  <ion-thumbnail item-start>\n    <img src="assets/imgs/fotoPerfil.png">\n  </ion-thumbnail>\n  <h2>Nutri Brasil</h2>\n  <p>{{ email}}</p>\n  <button ion-button clear item-end>View</button>\n</ion-item>\n</ion-content>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, fire, toastCrtl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toastCrtl = toastCrtl;
        this.tabBarElement = document.querySelector('.show-tabbar');
    }
    RegisterPage.prototype.ionViewWillEnter = function () {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        var tabs = document.querySelectorAll('.show-tabbar');
        if (tabs == null) {
            Object.keys(tabs).map(function (key) {
                tabs[key].style.display = 'none';
            });
        }
    };
    RegisterPage.prototype.ionViewWillLeave = function () {
        var tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map(function (key) {
                tabs[key].style.display = 'none';
            });
        }
    };
    RegisterPage.prototype.registrar = function () {
        var _this = this;
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
            .then(function (data) {
            console.log('aqui temos a data: ', data);
            toast.setMessage('Usuário cadastrado com sucesso!');
            toast.present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        })
            .catch(function (error) {
            if (error == 'auth/email-already-in-use') {
                toast.setMessage('O email digitado já está em uso.');
            }
            else if (error == 'auth/invalid-email') {
                toast.setMessage('O email digitado não é válido.');
            }
            else if (error == 'auth/operation-not-allowed') {
                toast.setMessage('Operação não permitida.');
            }
            else if (error == 'auth/weak-password') {
                toast.setMessage('Senha muito fraca.');
            }
            toast.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('usuario'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('senha'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "password", void 0);
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Cadastrar\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-label><ion-icon name="person"> </ion-icon> Email: </ion-label>\n    <ion-input type="text" #usuario></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label><ion-icon name="lock"></ion-icon> Senha: </ion-label>\n    <ion-input type="password" #senha></ion-input>\n  </ion-item>\n  <button ion-button block class="btn_cadastrar"(click)="registrar()">Cadastrar</button>\n</ion-content>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RecuperarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RecuperarPage = /** @class */ (function () {
    function RecuperarPage(navCtrl, navParams, fire, toastCrtl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.toastCrtl = toastCrtl;
    }
    RecuperarPage.prototype.recuperar = function () {
        var _this = this;
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
            .then(function (data) {
            console.log('aqui temos a data: ', data);
            toast.setMessage('Solicitação foi enviada para seu email!');
            toast.present();
            _this.navCtrl.pop();
        })
            .catch(function (error) {
            if (error == 'auth/invalid-email') {
                toast.setMessage('O email digitado não é válido.');
            }
            else if (error == 'auth/user-not-found') {
                toast.setMessage('Usuário não encontrado.');
            }
            toast.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('email'),
        __metadata("design:type", Object)
    ], RecuperarPage.prototype, "emailDigitado", void 0);
    RecuperarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recuperar',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/recuperar/recuperar.html"*/'<!--\n  Generated template for the RecuperarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Recuperar senha</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <p style="text-align: center"><a>Digite eu email cadastrado</a></p>\n  <ion-item>\n    <ion-label><ion-icon name="person"></ion-icon> Email: </ion-label>\n    <ion-input type="text" #email></ion-input>\n  </ion-item>\n  <button ion-button block class="btn_recuperar" (click)="recuperar()">Recuperar</button>\n</ion-content>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/recuperar/recuperar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], RecuperarPage);
    return RecuperarPage;
}());

//# sourceMappingURL=recuperar.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_wordpress_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PostPage = /** @class */ (function () {
    function PostPage(navCtrl, navParams, loadingCtrl, wordpressservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.wordpressservice = wordpressservice;
        this.category = new Array();
    }
    PostPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.post = this.navParams.get('item');
        __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].forkJoin(this.getAuthorData(), this.getCategories())
            .subscribe(function (data) {
            _this.user = data[0].name;
            _this.category = data[1];
            loading.dismiss();
        });
    };
    PostPage.prototype.getAuthorData = function () {
        return this.wordpressservice.getAuthor(this.post.author);
    };
    PostPage.prototype.getCategories = function () {
        return this.wordpressservice.getPostCategories(this.post);
    };
    PostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-post',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/post/post.html"*/'<!--\n  Generated template for the PostPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title *ngIf="post">Post</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="post">\n\n  <div>\n    <img [src]="post.better_featured_image.source_url" class="imgTopo">\n  </div>\n  <div [innerHTML]="post.title.rendered" padding class="post-title"></div>\n  <p class="post_content"[innerHTML]="post.content.rendered" padding></p>\n\n  <ion-row>\n    <ion-col>\n      <ion-icon name="calendar"></ion-icon>\n      {{ post.date.split(\'T\')[0] | date: \'d MMM, y\' }}\n    </ion-col>\n    <ion-col>\n      <ion-icon ios="ios-person" md="md-person"></ion-icon>\n      {{ user }}\n    </ion-col>\n  </ion-row>\n\n  <ion-grid>\n    <p class="bold-title">Categoria: </p>\n  <ion-row>\n    <ion-col class="category-col" *ngFor="let cat of category">\n      <ion-badge> {{ cat.name }} </ion-badge>\n    </ion-col>\n  </ion-row>\n  </ion-grid>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/post/post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__services_wordpress_service__["a" /* WordpressService */]])
    ], PostPage);
    return PostPage;
}());

//# sourceMappingURL=post.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dicas/dicas.module": [
		464,
		5
	],
	"../pages/post/post.module": [
		465,
		4
	],
	"../pages/profile/profile.module": [
		468,
		3
	],
	"../pages/recuperar/recuperar.module": [
		466,
		2
	],
	"../pages/register/register.module": [
		467,
		1
	],
	"../pages/tabs/tabs.module": [
		469,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 203;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(314);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_post_post__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dicas_dicas__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_register_register__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_recuperar_recuperar__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_wordpress_service__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var firebaseAuth = {
    apiKey: "AIzaSyDjJWNp0mdVIf7URPCz882aalyk_EFqovk",
    authDomain: "nutri-ed8b6.firebaseapp.com",
    databaseURL: "https://nutri-ed8b6.firebaseio.com",
    projectId: "nutri-ed8b6",
    storageBucket: "nutri-ed8b6.appspot.com",
    messagingSenderId: "1083790561487",
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dicas_dicas__["a" /* DicasPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_recuperar_recuperar__["a" /* RecuperarPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_post_post__["a" /* PostPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dicas/dicas.module#DicasPageModule', name: 'DicasPage', segment: 'dicas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/post/post.module#PostPageModule', name: 'PostPage', segment: 'post', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recuperar/recuperar.module#RecuperarPageModule', name: 'RecuperarPage', segment: 'recuperar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_dicas_dicas__["a" /* DicasPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_recuperar_recuperar__["a" /* RecuperarPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_post_post__["a" /* PostPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__services_wordpress_service__["a" /* WordpressService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Users; });
var Users = /** @class */ (function () {
    function Users() {
    }
    return Users;
}());

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export wordpress_url */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wordpress_rest_API_url; });
//confir api
var wordpress_url = 'https://sujeitoprogramador.com/nutriapp/';
var wordpress_rest_API_url = wordpress_url + 'wp-json/wp/v2/';
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth) {
        var _this = this;
        var authObserver = afAuth.authState.subscribe(function (users) {
            if (users) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */];
                authObserver.unsubscribe();
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
                authObserver.unsubscribe();
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dicas_dicas__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.DicasPage = __WEBPACK_IMPORTED_MODULE_1__dicas_dicas__["a" /* DicasPage */];
        this.ProfilePage = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/tabs/tabs.html"*/'<ion-tabs >\n  <ion-tab [root]="DicasPage" tabTitle="Postagens" tabIcon="book"></ion-tab>\n  <ion-tab [root]="ProfilePage" tabTitle="Perfil" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/tabs/tabs.html"*/,
        })
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recuperar_recuperar__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, toastCrtl, fire) {
        this.navCtrl = navCtrl;
        this.toastCrtl = toastCrtl;
        this.fire = fire;
        this.users = new __WEBPACK_IMPORTED_MODULE_5__users__["a" /* Users */]();
        this.tabBarElement = document.querySelector('.show-tabbar');
    }
    HomePage.prototype.ngAfterViewInit = function () {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        var tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map(function (key) {
                tabs[key].style.display = 'none';
            });
        }
    };
    HomePage.prototype.ionViewWillLeave = function () {
        var tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map(function (key) {
                tabs[key].style.display = 'none';
            });
        }
    };
    HomePage.prototype.login = function () {
        var _this = this;
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(function (data) {
            console.log('aqui temos a data: ', data);
            _this.users.email == _this.email.value;
            _this.users.senha == _this.password.value;
            //toast.setMessage('Usuário cadastrado com sucesso!');
            //toast.present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        })
            .catch(function (error) {
            if (error == 'auth/user-disabled') {
                toast.setMessage('Usuário está desabilitado.');
            }
            else if (error == 'auth/invalid-email') {
                toast.setMessage('O email digitado não é válido.');
            }
            else if (error == 'auth/user-not-found') {
                toast.setMessage('Usuário não encontrado.');
            }
            else if (error == 'auth/wrong-password') {
                toast.setMessage('Senha incorreta.');
            }
            toast.present();
        });
    };
    HomePage.prototype.cadastrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    HomePage.prototype.recuperar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__recuperar_recuperar__["a" /* RecuperarPage */]);
    };
    HomePage.prototype.loginwithfacebook = function () {
        var _this = this;
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth.FacebookAuthProvider)
            .then(function (data) {
            toast.setMessage('Login realizado com sucesso');
            toast.present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        });
    };
    HomePage.prototype.loginVisitante = function () {
        var _this = this;
        var toast = this.toastCrtl.create({ duration: 3000, position: 'bottom' });
        this.fire.auth.signInAnonymously()
            .then(function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        })
            .catch(function (error) {
            if (error === 'auth/operation-not-allowed') {
                toast.setMessage('Modo visitante está desabilitado');
            }
            else {
                console.error(error);
            }
            toast.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('usuario'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('senha'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "password", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/home/home.html"*/'\n<ion-content padding>\n\n <img class="logo" src="assets/imgs/CursoLogo.png">\n\n  <ion-item>\n    <ion-label><ion-icon name="person"> </ion-icon> Email: </ion-label>\n    <ion-input type="text" #usuario></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label><ion-icon name="lock"></ion-icon> Senha: </ion-label>\n    <ion-input type="password" #senha></ion-input>\n  </ion-item>\n  <button ion-button block class="btn_login" (click)="login()">Login</button>\n  <button ion-button block class="btn_login" (click)="loginwithfacebook()" icon-start><ion-icon name="logo-facebook"></ion-icon>Login com Facebook</button>\n<button ion-button block class="btn_login" (click)="loginVisitante()" color="danger">Entrar como visitante</button>\n  <p class="textos"><a (click)="cadastrar()">Criar uma conta</a></p>\n  <p class="textos"><a (click)="recuperar()">Esqueci minha senha</a></p>\n</ion-content>\n'/*ion-inline-end:"/home/lariteixeira/Projeto TWM/Nutri/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[292]);
//# sourceMappingURL=main.js.map