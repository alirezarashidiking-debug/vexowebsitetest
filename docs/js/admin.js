import{auth}from'./firebase.js';
import{onAuthStateChanged}from'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';
import{httpsCallable,getFunctions}from'https://www.gstatic.com/firebasejs/12.5.0/firebase-functions.js';
const $=id=>document.getElementById(id),fn=getFunctions(undefined,'us-central1'),call=n=>httpsCallable(fn,n);let authorized=false;
const show=(id,v)=>{const e=$(id);if(e)e.textContent=v;};
onAuthStateChanged(auth,async u=>{if(!u)return;const token=await u.getIdTokenResult(true);authorized=token.claims.god===true;show('adminState',authorized?'GOD authorization verified.':'Access denied: verified GOD claim required.');if(!authorized)return;document.querySelectorAll('[data-admin-action]').forEach(b=>b.disabled=false);try{const s=(await call('adminDashboardStats')({})).data;show('adminStats',`${s.players} players · ${s.goldToday}/${s.cap} Gold earned today · ${s.pendingOrders} pending orders · ${s.banned} banned`);}catch(e){show('adminStats',e.message);}});
$('findPlayer')?.addEventListener('click',async()=>{if(!authorized)return;try{const r=(await call('adminFindPlayer')({playerId:$('playerId').value.trim()})).data;$('playerResult').textContent=r.found?JSON.stringify(r,null,2):'Player not found.';}catch(e){$('playerResult').textContent=e.message;}});
$('adjustWallet')?.addEventListener('click',async()=>{if(!authorized)return;try{const r=(await call('adminAdjustWallet')({playerId:$('adjustPlayerId').value.trim(),currency:$('currency').value,amount:Number($('amount').value),reason:$('reason').value.trim()})).data;$('walletResult').textContent='Wallet updated: '+JSON.stringify(r.wallet);}catch(e){$('walletResult').textContent=e.message;}});
$('banPlayer')?.addEventListener('click',async()=>{if(!authorized)return;try{await call('adminSetBan')({playerId:$('banPlayerId').value.trim(),banned:$('banAction').value==='ban',reason:$('banReason').value.trim()});$('banResult').textContent='Account action saved and audited.';}catch(e){$('banResult').textContent=e.message;}});

$('saveEconomy')?.addEventListener('click',async()=>{if(!authorized)return;try{const r=(await call('adminSetEconomy')({dailyGoldCap:Number($('dailyGoldCap').value)})).data;$('economyResult').textContent=`Daily Gold cap saved: ${r.dailyGoldCap}`;}catch(e){$('economyResult').textContent=e.message;}});

$('loadAudit')?.addEventListener('click',async()=>{if(!authorized)return;try{const r=(await call('adminGetAudit')({})).data;$('auditResult').textContent=JSON.stringify(Object.values(r.entries).reverse().slice(0,50),null,2);}catch(e){$('auditResult').textContent=e.message;}});
