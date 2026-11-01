<script>
/* ADIM-İST çevrimiçi deneme: Health Connect'ten okunan son 15 günü kodlu olarak sunucuya gönderir.
   Yalnızca kod, tarih, adım ve kaynak gider. Ad, telefon, okul gönderilmez. */
(function(){
  if(!window.AdimNative) return;              // tarayıcıda çalışmaz, yalnızca telefon uygulamasında
  var CFG = window.ADIM_SUNUCU || {url:"SUPABASE_URL_BURAYA", anon:"SUPABASE_ANON_BURAYA"};
  if(!CFG.url || CFG.url.indexOf("http")!==0) return;
  var KEY='adim-sync-son';
  function ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function durum(t,hata){ try{ var e=document.getElementById('synctext'); if(e) e.textContent=t; (window.log||function(){})(t,!!hata); }catch(_){} }
  function gonder(days, zorla){
    var kod=(typeof S!=='undefined'&&S&&S.code)||''; if(!kod){ return; }
    var bugun=ymd(new Date());
    try{ if(!zorla && localStorage.getItem(KEY)===bugun+'|'+days[days.length-1]) return; }catch(_){}
    var satir=[], n=days.length;
    for(var i=0;i<n;i++){ var d=new Date(); d.setDate(d.getDate()-(n-1-i));
      if(days[i]>0) satir.push({kod:kod, tarih:ymd(d), adim:Math.round(days[i]), kaynak:'health-connect', surum:'v9'}); }
    if(!satir.length) return;
    fetch(CFG.url.replace(/\/$/,'')+'/rest/v1/adim_deneme',{method:'POST',
      headers:{'apikey':CFG.anon,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify(satir)})
    .then(function(r){ if(r.ok){ try{localStorage.setItem(KEY,bugun+'|'+days[days.length-1]);}catch(_){}
        durum('Sunucuya gönderildi · '+satir.length+' gün · '+new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})); }
      else r.text().then(function(t){ durum('Sunucu hatası '+r.status+': '+t.slice(0,120),true); }); })
    .catch(function(e){ durum('İnternet yok, sonra tekrar denenecek',true); });
  }
  var son=null, eski=window.adimNativeSteps;
  window.adimNativeSteps=function(today, days){
    if(eski) eski(today, days);
    son=Array.isArray(days)&&days.length?days:[today]; gonder(son,false);
  };
  window.adimSimdiGonder=function(){ if(son) gonder(son,true); else if(AdimNative.requestPermission) AdimNative.requestPermission(); };
  var p=document.querySelector('.console .panel');
  if(p){ var b=document.createElement('button'); b.className='btn'; b.textContent='Sunucuya şimdi gönder'; b.onclick=window.adimSimdiGonder; p.insertBefore(b,p.children[2]||null); }
})();
</script>
