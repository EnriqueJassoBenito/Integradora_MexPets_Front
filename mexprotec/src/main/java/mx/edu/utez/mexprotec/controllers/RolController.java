package mx.edu.utez.mexprotec.controllers;

import mx.edu.utez.mexprotec.models.rol.Rol;
import mx.edu.utez.mexprotec.services.RolService;
import mx.edu.utez.mexprotec.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rol/")
@CrossOrigin(origins = {"*"})
public class RolController {

    @Autowired
    private RolService rolService;

    public void createRolIfNotExist(){
        this.rolService.createRol();
    }

    @GetMapping("/")
    public ResponseEntity<CustomResponse<List<Rol>>> getAll(){
        return new ResponseEntity<>(
                this.rolService.getAll(),
                HttpStatus.OK
        );
    }
}
