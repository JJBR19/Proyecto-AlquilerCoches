// reservas.js — lista y gestión de reservas (localStorage)
(function(){
  function obtenerReservas(){ try{ return JSON.parse(localStorage.getItem('reservas')||'[]'); }catch(e){ return []; } }
  function guardarReservas(arr){ try{ localStorage.setItem('reservas', JSON.stringify(arr)); localStorage.setItem('reservas_last_update', Date.now().toString()); return true;}catch(e){return false;} }

  function formatDate(d){ if(!d) return ''; const dt = new Date(d); if(isNaN(dt.getTime())) return d; return dt.toLocaleDateString('es-ES'); }

  function render(){
    const container = document.getElementById('reservas-list');
    if(!container) return;
    const reservas = obtenerReservas() || [];
    container.innerHTML = '';

    if (!reservas.length){
      const p = document.createElement('p'); p.className='empty'; p.textContent = 'No tienes reservas todavía.'; container.appendChild(p); return;
    }

    reservas.forEach(r => {
      const card = document.createElement('div'); card.className = 'reserva-card';

      const meta = document.createElement('div'); meta.className='reserva-meta';
      const img = document.createElement('img'); img.className='img'; img.src = r.imagen;
      const info = document.createElement('div'); info.className='reserva-info';
      const h = document.createElement('h4'); h.textContent = r.coche || '— Coche —';
      const details = document.createElement('p');
      details.innerHTML = `<strong>Oficina:</strong> ${r.oficina_recogida || '-'}<br>
        <strong>Recogida:</strong> ${formatDate(r.fecha_recogida)} ${r.hora_recogida || ''}<br>
        <strong>Devolución:</strong> ${formatDate(r.fecha_devolucion)} ${r.hora_devolucion || ''}`;

      info.appendChild(h); info.appendChild(details);
      meta.appendChild(img); meta.appendChild(info);

      const actions = document.createElement('div'); actions.className = 'reserva-actions';
      const cancel = document.createElement('button'); cancel.className='btn btn-danger btn-small'; cancel.textContent='Cancelar reserva';
      cancel.addEventListener('click', ()=>{
        if(!confirm('¿Confirmas cancelar esta reserva?')) return;
        const arr = obtenerReservas().filter(x => x.id !== r.id);
        guardarReservas(arr);
        render();
      });

      actions.appendChild(cancel);
      card.appendChild(meta);
      card.appendChild(actions);
      container.appendChild(card);
    });
  }

  // Renderizar al cargar
  document.addEventListener('DOMContentLoaded', function(){ render(); });

  // Escuchar cambios en localStorage para actualizar la lista en otras pestañas
  window.addEventListener('storage', function(ev){ if(ev.key && ev.key.indexOf('reservas')!==-1){ render(); } });
})();