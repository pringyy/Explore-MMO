(function(g){var window=this;var N5=function(a,b){var c="ytp-miniplayer-button-bottom-right",d={G:"svg",U:{height:"18px",version:"1.1",viewBox:"0 0 22 18",width:"22px"},S:[{G:"g",U:{fill:"none","fill-rule":"evenodd",stroke:"none","stroke-width":"1"},S:[{G:"g",U:{transform:"translate(-1.000000, -3.000000)"},S:[{G:"polygon",U:{points:"0 0 24 0 24 24 0 24"}},{G:"path",U:{d:"M19,7 L5,7 L5,17 L19,17 L19,7 Z M23,19 L23,4.98 C23,3.88 22.1,3 21,3 L3,3 C1.9,3 1,3.88 1,4.98 L1,19 C1,20.1 1.9,21 3,21 L21,21 C22.1,21 23,20.1 23,19 Z M21,19.02 L3,19.02 L3,4.97 L21,4.97 L21,19.02 Z",
fill:"#fff","fill-rule":"nonzero"}}]}]}]},e="Open video page";a.T().aa("kevlar_miniplayer_expand_top")&&(c="ytp-miniplayer-button-top-left",d={G:"svg",U:{height:"24px",version:"1.1",viewBox:"0 0 24 24",width:"24px"},S:[{G:"g",U:{fill:"none","fill-rule":"evenodd",stroke:"none","stroke-width":"1"},S:[{G:"g",U:{transform:"translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "},S:[{G:"path",U:{d:"M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z",
fill:"#fff","fill-rule":"nonzero"}}]}]}]},e="Expand");g.V.call(this,{G:"button",ia:["ytp-miniplayer-expand-watch-page-button","ytp-button",c],U:{title:"{{title}}","data-tooltip-target-id":"ytp-miniplayer-expand-watch-page-button"},S:[d]});this.J=a;this.wa("click",this.onClick,this);this.ya("title",g.sU(a,e,"i"));g.Wf(this,g.RU(b.Nb(),this.element))},O5=function(a){g.V.call(this,{G:"div",
L:"ytp-miniplayer-ui"});this.rh=!1;this.player=a;this.R(a,"minimized",this.Mi);this.R(a,"onStateChange",this.oQ)},P5=function(a){g.sS.call(this,a);
this.u=new O5(this.player);this.u.hide();g.iP(this.player,this.u.element,4);a.app.visibility.u&&(this.load(),g.K(a.getRootNode(),"ytp-player-minimized",!0))};
g.u(N5,g.V);N5.prototype.onClick=function(){this.J.xa("onExpandMiniplayer")};g.u(O5,g.V);g.k=O5.prototype;
g.k.show=function(){this.Od=new g.Um(this.Up,null,this);this.Od.start();if(!this.rh){this.tooltip=new g.WX(this.player,this);g.D(this,this.tooltip);g.iP(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Ob=new g.LU(this.player);g.D(this,this.Ob);this.Zk=new g.V({G:"div",L:"ytp-miniplayer-scrim"});g.D(this,this.Zk);this.Zk.ga(this.element);this.R(this.Zk.element,"click",this.vE);var a=new g.V({G:"button",ia:["ytp-miniplayer-close-button","ytp-button"],U:{"aria-label":"Close"},S:[g.DN()]});
g.D(this,a);a.ga(this.Zk.element);this.R(a.element,"click",this.Gn);a=new N5(this.player,this);g.D(this,a);a.ga(this.Zk.element);this.Bl=new g.V({G:"div",L:"ytp-miniplayer-controls"});g.D(this,this.Bl);this.Bl.ga(this.Zk.element);this.R(this.Bl.element,"click",this.vE);var b=new g.V({G:"div",L:"ytp-miniplayer-button-container"});g.D(this,b);b.ga(this.Bl.element);a=new g.V({G:"div",L:"ytp-miniplayer-play-button-container"});g.D(this,a);a.ga(this.Bl.element);var c=new g.V({G:"div",L:"ytp-miniplayer-button-container"});
g.D(this,c);c.ga(this.Bl.element);this.TE=new g.XW(this.player,this,!1);g.D(this,this.TE);this.TE.ga(b.element);b=new g.UW(this.player,this);g.D(this,b);b.ga(a.element);this.nextButton=new g.XW(this.player,this,!0);g.D(this,this.nextButton);this.nextButton.ga(c.element);this.Sh=new g.LX(this.player,this);g.D(this,this.Sh);this.Sh.ga(this.Zk.element);this.Yc=new g.aX(this.player,this);g.D(this,this.Yc);g.iP(this.player,this.Yc.element,4);this.ot=new g.V({G:"div",L:"ytp-miniplayer-buttons"});g.D(this,
this.ot);g.iP(this.player,this.ot.element,4);a=new g.V({G:"button",ia:["ytp-miniplayer-close-button","ytp-button"],U:{"aria-label":"Close"},S:[g.DN()]});g.D(this,a);a.ga(this.ot.element);this.R(a.element,"click",this.Gn);a=new g.V({G:"button",ia:["ytp-miniplayer-replay-button","ytp-button"],U:{"aria-label":"Close"},S:[g.IN()]});g.D(this,a);a.ga(this.ot.element);this.R(a.element,"click",this.yO);this.R(this.player,"presentingplayerstatechange",this.ac);this.R(this.player,"appresize",this.Ta);this.R(this.player,
"fullscreentoggled",this.Ta);this.Ta();this.rh=!0}0!==this.player.getPlayerState()&&g.V.prototype.show.call(this);this.Yc.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.Od&&(this.Od.dispose(),this.Od=void 0);g.V.prototype.hide.call(this);this.player.app.visibility.u||(this.rh&&this.Yc.hide(),this.player.loadModule("annotations_module"))};
g.k.ba=function(){this.Od&&(this.Od.dispose(),this.Od=void 0);g.V.prototype.ba.call(this)};
g.k.Gn=function(){this.player.stopVideo();this.player.xa("onCloseMiniplayer")};
g.k.yO=function(){this.player.playVideo()};
g.k.vE=function(a){if(a.target===this.Zk.element||a.target===this.Bl.element)g.Q(this.player.T().experiments,"kevlar_miniplayer_play_pause_on_scrim")?g.IL(g.JI(this.player))?this.player.pauseVideo():this.player.playVideo():this.player.xa("onExpandMiniplayer")};
g.k.Mi=function(){g.K(this.player.getRootNode(),"ytp-player-minimized",this.player.app.visibility.u)};
g.k.Yd=function(){this.Yc.kc();this.Sh.kc()};
g.k.Up=function(){this.Yd();this.Od&&this.Od.start()};
g.k.ac=function(a){g.U(a.state,32)&&this.tooltip.hide()};
g.k.Ta=function(){this.Yc.setPosition(0,g.aF(this.player).getPlayerSize().width,!1);g.cX(this.Yc)};
g.k.oQ=function(a){this.player.app.visibility.u&&(0===a?this.hide():this.show())};
g.k.Nb=function(){return this.tooltip};
g.k.Ud=function(){return!1};
g.k.ye=function(){return!1};
g.k.uh=function(){return!1};
g.k.Ey=function(){};
g.k.Dl=function(){};
g.k.To=function(){};
g.k.tk=function(){return null};
g.k.mi=function(){return new g.ag(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.On=function(a,b,c,d,e){var f=0,h=d=0,l=g.Bg(a);if(b){c=g.cn(b,"ytp-prev-button")||g.cn(b,"ytp-next-button");var m=g.cn(b,"ytp-play-button"),n=g.cn(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.zg(b,this.element),h=b.x,f=b.y-12):n&&(h=g.cn(b,"ytp-miniplayer-button-top-left"),f=g.zg(b,this.element),b=g.Bg(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=g.aF(this.player).getPlayerSize().width;e=f+(e||0);l=g.Wd(h,0,b-l.width);e?(a.style.top=e+
"px",a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.Vj=function(){};
g.k.pj=function(){return!1};g.u(P5,g.sS);P5.prototype.create=function(){};
P5.prototype.Oh=function(){return!1};
P5.prototype.load=function(){this.player.hideControls();this.u.show()};
P5.prototype.unload=function(){this.player.showControls();this.u.hide()};g.eU.miniplayer=P5;})(_yt_player);
