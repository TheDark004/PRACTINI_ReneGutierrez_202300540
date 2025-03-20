# Informe #3: Sistemas Operativos ⚙️
# Manual de Instalación de Ubuntu 24.04 LTS 🐧

Este manual te guiará en la instalación de Ubuntu 24.04 LTS y te proporcionará los comandos básicos para trabajar en la terminal. ¡Vamos a ello! 

---

## 🛠️ Instalación de Ubuntu 24.04 LTS

### 1️⃣ **Descarga la imagen ISO**
- Visita el sitio oficial de [Ubuntu](https://ubuntu.com/download) y descarga la imagen ISO de Ubuntu 24.04 LTS.

### 2️⃣ **Crea un USB booteable**
- Usa herramientas como [Rufus](https://rufus.ie/) (Windows) o `dd` en Linux para crear un USB booteable con la imagen ISO.

> 📌 **Comando en Linux para crear USB booteable:**
```bash
 dd if=ubuntu-24.04.iso of=/dev/sdX bs=4M status=progress
```
*(Reemplaza `/dev/sdX` con la unidad USB correcta.)*

### 3️⃣ **Instalar Ubuntu**
1. Conecta el USB a tu computadora y reinicia.
2. Entra en la **BIOS/UEFI** y selecciona el USB como dispositivo de arranque.
3. Sigue las instrucciones en pantalla para completar la instalación.
4. Configura tu usuario y contraseña.

---

## 🖥️ Comandos Básicos en la Terminal

### 📂 **Navegar entre archivos y directorios**
- `cd [ruta]`: Cambia al directorio especificado.
    ```bash
    cd /ruta/al/directorio
    ```
- `cd ..`: Retrocede un nivel en la estructura de directorios.
    ```bash
    cd ..
    ```
- `cd ~`: Te lleva al directorio home del usuario actual.
    ```bash
    cd ~
    ```

### 👀 **Ver el contenido de un directorio**
- `ls`: Lista los archivos y directorios en la ubicación actual.
    ```bash
    ls
    ```
- `ls -l`: Muestra detalles adicionales (permisos, tamaño, etc.).
    ```bash
    ls -l
    ```
- `ls -a`: Muestra archivos ocultos.
    ```bash
    ls -a
    ```

### 📁 **Crear carpetas en un directorio**
- `mkdir [nombre_carpeta]`: Crea una nueva carpeta.
    ```bash
    mkdir nueva_carpeta
    ```

### 📂 **Copiar archivos y carpetas**
- `cp [origen] [destino]`: Copia un archivo o carpeta.
    ```bash
    cp archivo.txt /ruta/al/destino/
    ```
- `cp -r [origen] [destino]`: Copia una carpeta y su contenido.
    ```bash
    cp -r carpeta /ruta/al/destino/
    ```

### 🚚 **Mover archivos y carpetas**
- `mv [origen] [destino]`: Mueve un archivo o carpeta.
    ```bash
    mv archivo.txt /ruta/al/destino/
    ```

### 🗑️ **Eliminar archivos y carpetas**
- `rm [archivo]`: Elimina un archivo.
    ```bash
    rm archivo.txt
    ```
- `rm -r [carpeta]`: Elimina una carpeta y su contenido.
    ```bash
    rm -r carpeta
    ```

### 👑 **Ingresar como Superusuario (root)**
- `sudo -i`: Inicia una sesión como superusuario.
    ```bash
    sudo -i
    ```
- `sudo [comando]`: Ejecuta un comando con permisos de superusuario.
    ```bash
    sudo apt update
    ```

### 🔒 **Actualizar permisos de archivos o directorios**
- `chmod [permisos] [archivo]`: Cambia los permisos de un archivo o directorio.
    ```bash
    chmod 755 archivo.txt
    ```
- `chown [usuario]:[grupo] [archivo]`: Cambia el propietario y grupo de un archivo.
    ```bash
    chown usuario:grupo archivo.txt
    ```

### 📝 **Crear/editar un archivo de texto**
- `nano [archivo]`: Abre el archivo en el editor Nano.
    ```bash
    nano archivo.txt
    ```
- `vim [archivo]`: Abre el archivo en el editor Vim.
    ```bash
    vim archivo.txt
    ```

### 📦 **Instalar paquetes desde la terminal**
- `sudo apt install [paquete]`: Instala un paquete.
    ```bash
    sudo apt install nombre_paquete
    ```

### 🔄 **Actualizar paquetes**
- `sudo apt update`: Actualiza la lista de paquetes disponibles.
    ```bash
    sudo apt update
    ```
- `sudo apt upgrade`: Actualiza los paquetes instalados.
    ```bash
    sudo apt upgrade
    ```

---

## 🖼️ Ilustraciones y Recursos
Para hacer más comprensible este manual, aquí hay algunas imágenes ilustrativas:

### 🖥️ **Proceso de Instalación de Ubuntu**
<img src="https://ubunlog.com/wp-content/uploads/2018/10/VirtualBox_Ubuntu_19_10_2018_16_47_47.png" alt="Instalación Ubuntu" width="700">

### 💻 **Interfaz de la Terminal**
<img src="https://serverspace.io/wp-content/uploads/2023/07/virtualbox_ubuntu_11_10_2018_15_46_13_1539251202.jpg" alt="Terminal Ubuntu" width="700">

---

### 🎯 **Conclusión**
Ubuntu 24.04 LTS es un sistema operativo potente y accesible tanto para principiantes como para expertos. Con este manual, ahora puedes instalarlo y comenzar a usar la terminal con comandos esenciales. 

Si quieres aprender más, visita la documentación oficial de [Ubuntu](https://help.ubuntu.com/). ¡Feliz aprendizaje! 🎉
