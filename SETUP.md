# LOBBO — Sitio + Panel de administración

Tu sitio ahora tiene un **panel de administración** en `viplobbo.com/admin` donde podés
cargar **fechas**, **sets** y **álbumes** sin tocar código. Cada vez que guardás un cambio,
el sitio se re-publica solo en ~1 minuto.

---

## 📅 Uso diario (lo que vas a hacer siempre)

1. Entrá a **`viplobbo.com/admin`**
2. Iniciá sesión (botón **"Sign in with GitHub"**)
3. Vas a ver 3 secciones:
   - **Próximas fechas** — agregá las noches (fecha, sesión, DJ, link de QR)
   - **Sets (Lobbo Sessions)** — agregá los videos de YouTube
   - **Galería (álbumes)** — agregá álbumes (título + link de Drive + foto de tapa)
4. Tocá **"New ..."**, completá el formulario y **Publish**.

**Reglas automáticas en la web:**
- **Fechas:** muestra hasta **5**, la más próxima arriba. Las fechas que ya pasaron desaparecen solas.
- **Sets:** muestra los **3** más nuevos (el último arriba).
- **Galería:** muestra los **5** álbumes más nuevos (el más nuevo es el destacado grande).
- En una fecha, si dejás el **link de QR vacío**, el botón muestra el aviso "Próximamente".

---

## ⚙️ Configuración inicial (UNA sola vez)

> Esto se hace una sola vez para conectar el panel. Después solo usás `/admin`.

### 1. Subir el proyecto a GitHub
1. Creá una cuenta en [github.com](https://github.com) (si no tenés).
2. Creá un repositorio nuevo (ej. `lobbo-landing`), privado o público.
3. Subí **todos estos archivos** al repo (podés arrastrarlos en la web de GitHub:
   botón "Add file" → "Upload files").
   - No subas las carpetas `node_modules` ni `_site` (se generan solas).

### 2. Conectar Netlify al repositorio
En tu sitio de Netlify:
1. **Site configuration → Build & deploy → Continuous deployment → Link repository**
2. Elegí GitHub y tu repo.
3. Configuración de build (si no se completa sola):
   - **Build command:** `npm run build`
   - **Publish directory:** `_site`
4. Deploy. A partir de ahora, cada cambio en GitHub (o desde `/admin`) republica el sitio.

### 3. Decirle al panel cuál es tu repo
Editá el archivo **`src/admin/config.yml`** y cambiá esta línea:
```yaml
repo: TU-USUARIO/TU-REPO    # ej: lobbo/lobbo-landing
```
por tu usuario/repo real. Guardá y subí el cambio.

### 4. Activar el login con GitHub (OAuth)
Esto permite entrar al panel de forma segura.

**a) Crear una "OAuth App" en GitHub:**
1. GitHub → tu foto (arriba a la derecha) → **Settings → Developer settings → OAuth Apps → New OAuth App**
2. Completá:
   - **Application name:** `LOBBO Admin`
   - **Homepage URL:** `https://viplobbo.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Create → copiá el **Client ID** y generá un **Client Secret**.

**b) Registrar esos datos en Netlify:**
1. Netlify → **Site configuration → Access & security → OAuth → Authentication providers**
2. **Install provider → GitHub** → pegá el **Client ID** y el **Client Secret**.
3. Guardá.

### 5. Probar
Entrá a `viplobbo.com/admin` → **Sign in with GitHub** → ya podés cargar contenido. ✅

---

## 🔑 Alternativa de login (si el OAuth te complica)
Sveltia permite entrar con un **token personal** sin configurar OAuth:
en la pantalla de login del panel, usá **"Sign in with Token"** y pegá un
*Personal Access Token* de GitHub (con permiso sobre el repo). Es más simple para
una sola persona, aunque el OAuth es más cómodo a largo plazo.

---

## 💻 Para editar el diseño en tu compu (opcional)
```bash
npm install      # una vez
npm run dev      # abre un servidor local con recarga automática
```
El sitio se arma desde `src/index.njk` y el contenido vive en `src/content/`.

---

## ❓ Dudas frecuentes
- **¿Dónde se guardan las fotos de tapa que subo?** En `src/assets/uploads` dentro del repo.
- **¿Puedo tener más de 5 álbumes cargados?** Sí, cargá los que quieras: la web muestra
  solo los 5 más nuevos, pero quedan todos guardados.
- **Cambié algo y no se ve.** Esperá ~1 min (Netlify republica) y refrescá con Ctrl+F5.
