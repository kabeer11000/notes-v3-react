window.kauth = (function () {
    /**
     * cross-storage - Cross domain local storage
     *
     * @version   1.0.0
     * @link      https://github.com/zendesk/cross-storage
     * @author    Daniel St. Jules <danielst.jules@gmail.com>
     * @copyright Zendesk
     * @license   Apache-2.0
     */
    !async function (e) {
        function t(e, r) {
            r = r || {}, this._id = t._generateUUID(), this._promise = r.promise || Promise, this._frameId = r.frameId || "CrossStorageClient-" + this._id, this._origin = t._getOrigin(e), this._requests = {}, this._connected = !1, this._closed = !1, this._count = 0, this._timeout = r.timeout || 5e3, this._listener = null, this._installListener();
            var o;
            r.frameId && (o = document.getElementById(r.frameId)), o && this._poll(), o = o || this._createFrame(e), this._hub = o.contentWindow
        }

        t.frameStyle = {
            display: "none",
            position: "absolute",
            top: "-999px",
            left: "-999px"
        }, t._getOrigin = function (e) {
            var t, r, o;
            return t = document.createElement("a"), t.href = e, t.host || (t = window.location), r = t.protocol && ":" !== t.protocol ? t.protocol : window.location.protocol, o = r + "//" + t.host, o = o.replace(/:80$|:443$/, "")
        }, t._generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t = 16 * Math.random() | 0, r = "x" == e ? t : 3 & t | 8;
                return r.toString(16)
            })
        }, t.prototype.onConnect = function () {
            var e = this;
            return this._connected ? this._promise.resolve() : this._closed ? this._promise.reject(new Error("CrossStorageClient has closed")) : (this._requests.connect || (this._requests.connect = []), new this._promise(function (t, r) {
                var o = setTimeout(function () {
                    r(new Error("CrossStorageClient could not connect"))
                }, e._timeout);
                e._requests.connect.push(function (e) {
                    return clearTimeout(o), e ? r(e) : (t(), void 0)
                })
            }))
        }, t.prototype.set = function (e, t) {
            return this._request("set", {key: e, value: t})
        }, t.prototype.get = function () {
            var e = Array.prototype.slice.call(arguments);
            return this._request("get", {keys: e})
        }, t.prototype.del = function () {
            var e = Array.prototype.slice.call(arguments);
            return this._request("del", {keys: e})
        }, t.prototype.clear = function () {
            return this._request("clear")
        }, t.prototype.getKeys = function () {
            return this._request("getKeys")
        }, t.prototype.close = function () {
            var e = document.getElementById(this._frameId);
            e && e.parentNode.removeChild(e), window.removeEventListener ? window.removeEventListener("message", this._listener, !1) : window.detachEvent("onmessage", this._listener), this._connected = !1, this._closed = !0
        }, t.prototype._installListener = function () {
            var e = this;
            this._listener = function (t) {
                var r, o, n, s;
                if (!e._closed && t.data && "string" == typeof t.data && (o = "null" === t.origin ? "file://" : t.origin, o === e._origin)) if ("cross-storage:unavailable" !== t.data) {
                    if (-1 !== t.data.indexOf("cross-storage:") && !e._connected) {
                        if (e._connected = !0, !e._requests.connect) return;
                        for (r = 0; r < e._requests.connect.length; r++) e._requests.connect[r](n);
                        delete e._requests.connect
                    }
                    if ("cross-storage:ready" !== t.data) {
                        try {
                            s = JSON.parse(t.data)
                        } catch (i) {
                            return
                        }
                        s.id && e._requests[s.id] && e._requests[s.id](s.error, s.result)
                    }
                } else {
                    if (e._closed || e.close(), !e._requests.connect) return;
                    for (n = new Error("Closing client. Could not access localStorage in hub."), r = 0; r < e._requests.connect.length; r++) e._requests.connect[r](n)
                }
            }, window.addEventListener ? window.addEventListener("message", this._listener, !1) : window.attachEvent("onmessage", this._listener)
        }, t.prototype._poll = function () {
            var e, t, r;
            e = this, r = "file://" === e._origin ? "*" : e._origin, t = setInterval(function () {
                return e._connected ? clearInterval(t) : (e._hub && e._hub.postMessage("cross-storage:poll", r), void 0)
            }, 1e3)
        }, t.prototype._createFrame = function (e) {
            var r, o;
            r = window.document.createElement("iframe"), r.id = this._frameId;
            for (o in t.frameStyle) t.frameStyle.hasOwnProperty(o) && (r.style[o] = t.frameStyle[o]);
            return window.document.body.appendChild(r), r.src = e, r
        }, t.prototype._request = function (e, t) {
            var r, o;
            return this._closed ? this._promise.reject(new Error("CrossStorageClient has closed")) : (o = this, o._count++, r = {
                id: this._id + ":" + o._count,
                method: "cross-storage:" + e,
                params: t
            }, new this._promise(function (e, t) {
                var n, s, i;
                n = setTimeout(function () {
                    o._requests[r.id] && (delete o._requests[r.id], t(new Error("Timeout: could not perform " + r.method)))
                }, o._timeout), o._requests[r.id] = function (s, i) {
                    return clearTimeout(n), delete o._requests[r.id], s ? t(new Error(s)) : (e(i), void 0)
                }, Array.prototype.toJSON && (s = Array.prototype.toJSON, Array.prototype.toJSON = null), i = "file://" === o._origin ? "*" : o._origin, o._hub.postMessage(JSON.stringify(r), i), s && (Array.prototype.toJSON = s)
            }))
        }, "undefined" != typeof module && module.exports ? module.exports = t : "undefined" != typeof exports ? exports.CrossStorageClient = t : "function" == typeof define && define.amd ? define([], function () {
            return t
        }) : e.CrossStorageClient = t
    }(this);

    class KAuth_sdk {
        constructor(method, sdk_uri) {
            this.main = {
                method: method,
                sdk_uri: 'http://auth.kabeersnetwork.rf.gd/js-sdk/compiled/' + sdk_uri + '.php'
            }
        }

        uniqid(a = "", b = false) {
            const c = Date.now() / 1000;
            let d = c.toString(16).split(".").join("");
            while (d.length < 14) d += "0";
            let e = "";
            if (b) {
                e = ".";
                e += Math.round(Math.random() * 100000000);
            }
            return a + d + e;
        }

        render(e, height, width, theme) {
            if (theme === 'light') {
                e.innerHTML = `<div class=k-net-auth-btn KAuth-${this.uniqid()}"><a href="${this.main.sdk_uri}?method=${this.main.method}"><img alt="Login With Kabeers Network" src="https://cdn.jsdelivr.net/gh/kabeer11000/k-auth-sdk/dist/light.svg" style="width:${width};height:${height};"></a></div>`;
            } else {
                e.innerHTML = `<div class=k-net-auth-btn KAuth-${this.uniqid()}"><a href="${this.main.sdk_uri}?method=${this.main.method}"><img alt="Login With Kabeers Network" src="https://cdn.jsdelivr.net/gh/kabeer11000/k-auth-sdk/dist/dark.svg" style="width:${width};height:${height};"></a></div>`;
            }
        }

        go() {
            window.location.href = this.main.sdk_uri + '?method=' + this.main.method;
        }

        getURL() {
            return this.main.sdk_uri + '?method=' + this.main.method;
        }

        export(KAuth_sdk) {
        }
    }

    const main = {
        info: undefined,
        client: {},
        init: function (data) {
            this.info = new KAuth_sdk(data.method, data.sdk_id);
            this.client.id = data.clientId;
        },
        render: function (data) {
            this.info.render(data.e, data.height, data.width, data.theme);
        },
        go: function () {
            this.info.go();
        },
        getURL() {
            return this.info.getURL();
        },
        showModal() {
            document.body.innerHTML += `<div class="k_chooser_container k_chooser_d-none"><div class="k_chooser_px-2" style="margin-top:1rem;text-align:center;line-height:1rem"><button style="position:fixed;float:right;right:1rem;top:1rem;margin-top:0.25rem;margin-right:0.25rem" class="k_chooser_close k_auth_mdc-button mdc-icon-button">X</button><img src="https://cdn.jsdelivr.net/gh/kabeer11000/sample-response/auth-sdk/logo.svg" style="width:1.5rem;height:auto;vertical-align:sub"> Sign in to <span class="k_chooser_product"></span><span>with Kabeers Network</span></div><div class="k_chooser_list" href="${this.getURL()}"></div><div class="k_chooser_btn-k"></div></div><div style="position:fixed;width:2.5rem;height:2.5rem;bottom:2.5rem;right:0;background-color:#d3d3d4;padding:.5rem;text-align:center;color:white;border-radius:10rem 0rem 0rem 10rem" class="k_chooser_auth_side-btn k_chooser_d-none"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div>`;

            function uniqid(a = "", b = false) {
                const c = Date.now() / 1000;
                let d = c.toString(16).split(".").join("");
                while (d.length < 14) d += "0";
                let e = "";
                if (b) {
                    e = ".";
                    e += Math.round(Math.random() * 100000000);
                }
                return a + d + e;
            }

            function getSearchParameters() {
                var prmstr = window.location.search.substr(1);
                return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
            }

            function transformToAssocArray(prmstr) {
                var params = {};
                var prmarr = prmstr.split("&");
                for (var i = 0; i < prmarr.length; i++) {
                    var tmparr = prmarr[i].split("=");
                    params[tmparr[0]] = tmparr[1];
                }
                return params;
            }

            var user = {};
            var req = getSearchParameters();
            if (req['username']) {
                [user.username, user.password, user.email] = [req['username'], req['username'], req['username']];
//   console.log(user)
                localStorage.setItem('k_auth_user', JSON.stringify(user));
                console.log(window.location.href);
                localStorage.setItem('k_logged_in_session', JSON.stringify(true));
                localStorage.setItem('user', JSON.stringify(user));
                window.history.replaceState({}, document.title, " " + window.location.pathname);
            }
            var colours = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
            var storage = new CrossStorageClient('http://auth.kabeersnetwork.rf.gd/widget/hub.php');
            storage.onConnect().then(function () {
                return storage.get('accounts');
            }).then(function (accounts) {
                let html = '';
                accounts = JSON.parse(accounts);
                if (localStorage.getItem('k_logged_in_session') === null) {
                    if (accounts) {
                        fetch('https://hosted-kabeersnetwork.000webhostapp.com/auth/api/widget/api/getToken.php?sdk_token_=' + uniqid(), {mode: 'cors'})
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (text) {
                                console.log(this.client);
                                fetch('https://hosted-kabeersnetwork.000webhostapp.com/auth/api/widget/api/getClientInfo.php?client_secret=' + this.client.id, {mode: 'cors'})
                                    .then(function (response) {
                                        return response.json();
                                    })
                                    .then(function (text) {
                                        document.querySelector('.k_chooser_product').innerHTML = text.name;
                                    })
                                    .catch(function (error) {
                                        console.log('K Auth SDK Failed to Get Client Token, Check Your Connection', error)
                                    });
                            })
                            .catch(function (error) {
                                console.log('K Auth SDK Failed to Get Client Token, Check Your Connection', error)
                            });
                        for (let i = 0; i < accounts.length; i++) {
                            html += `
   <div class="k_chooser_card k_chooser_ripple">
      <img class="k_chooser_img" src="https://ui-avatars.com/api/?color=FFFFFF&background=${colours[Math.floor(Math.random() * colours.length)].substr(1)}&format=png&size=250&rounded=true&length=2&name=${accounts[i].username}"><span class="k_chooser_span">${accounts[i].username}<br><span class="k_chooser_email">${accounts[i].email}</span></span>
   </div>
   `;
                        }
                    }
                    var divNode = document.createElement("link");
                    divNode.setAttribute("rel", "stylesheet");
                    divNode.setAttribute("href", "https://cdn.jsdelivr.net/gh/kabeer11000/sample-response/auth-sdk/style.min.css");
                    document.body.appendChild(divNode);
                    document.querySelector('.k_chooser_list').innerHTML = html;
                    document.querySelector('.k_chooser_container').classList.remove('k_chooser_d-none');
                } else {
                }
            }).catch(function (err) {
                console.error(err)
            });
            window.addEventListener('dblclick', function () {
                document.querySelector('.k_chooser_container').classList.add('k_chooser_d-none');
                document.querySelector('.k_chooser_auth_side-btn').classList.remove('k_chooser_d-none');
            });
            document.querySelector('.k_chooser_auth_side-btn').onclick = function () {
                document.querySelector('.k_chooser_auth_side-btn').classList.add('k_chooser_d-none');
                document.querySelector('.k_chooser_container').classList.remove('k_chooser_d-none');
            };
            document.querySelector('.k_chooser_close').onclick = function () {
                document.querySelector('.k_chooser_container').classList.add('k_chooser_d-none');
                document.querySelector('.k_chooser_auth_side-btn').classList.remove('k_chooser_d-none');
            };
            document.querySelector('.k_chooser_list').onclick = function () {
                main.go();
            };

            const k_chooser_ripple_rippleElements = document.querySelectorAll(".k_chooser_ripple");
            for (let i = 0; i < k_chooser_ripple_rippleElements.length; i++) {
                k_chooser_ripple_rippleElements[i].addEventListener('click', function (e) {
                    let X = e.pageX - this.offsetLeft;
                    let Y = e.pageY - this.offsetTop;
                    let k_chooser_ripple_rippleDiv = document.createElement("div");
                    k_chooser_ripple_rippleDiv.classList.add('k_chooser_ripple_ripple');
                    k_chooser_ripple_rippleDiv.setAttribute("style", "top:" + Y + "px; left:" + X + "px;");
                    let k_chooser_ripple_customColor = this.getAttribute('k_chooser_ripple_ripple-color');
                    if (k_chooser_ripple_customColor) k_chooser_ripple_rippleDiv.style.background = k_chooser_ripple_customColor;
                    this.appendChild(k_chooser_ripple_rippleDiv);
                    setTimeout(function () {
                        k_chooser_ripple_rippleDiv.parentElement.removeChild(k_chooser_ripple_rippleDiv);
                    }, 900);
                });
            }
        }
    };
    return main;
}(window));

kauth.init({method: 'login', sdk_id: '6fd34bcaf9f6d1ab37c0da5387770d1c', clientId: 'bm90ZXMxMg=='});
kauth.showModal();
