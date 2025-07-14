import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Obtener todas las adopciones
router.get('/', async (req, res) => {
    try {
        // Datos de adopciones del sistema
        const adoptions = [
            {
                id: 1,
                petName: 'Buddy',
                petType: 'Dog',
                adopter: 'Juan Pérez',
                adoptionDate: '2024-01-15',
                status: 'completed'
            },
            {
                id: 2,
                petName: 'Mimi',
                petType: 'Cat',
                adopter: 'María García',
                adoptionDate: '2024-02-20',
                status: 'pending'
            }
        ];
        
        res.status(200).json({
            status: 'success',
            payload: adoptions
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener adopciones'
        });
    }
});

// Obtener adopción por ID
router.get('/:aid', async (req, res) => {
    try {
        const { aid } = req.params;
        
        // Búsqueda de adopción por ID
        const adoption = {
            id: aid,
            petName: 'Buddy',
            petType: 'Dog',
            adopter: 'Juan Pérez',
            adoptionDate: '2024-01-15',
            status: 'completed',
            notes: 'Adopción completada exitosamente'
        };
        
        res.status(200).json({
            status: 'success',
            payload: adoption
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la adopción'
        });
    }
});

// Crear nueva adopción
router.post('/', requireAuth, async (req, res) => {
    try {
        const { petName, petType, adopter, notes } = req.body;
        
        if (!petName || !petType || !adopter) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan campos requeridos: petName, petType, adopter'
            });
        }
        
        // Creación de nueva adopción
        const newAdoption = {
            id: Date.now(),
            petName,
            petType,
            adopter,
            adoptionDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            notes: notes || ''
        };
        
        res.status(201).json({
            status: 'success',
            message: 'Adopción creada exitosamente',
            payload: newAdoption
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear la adopción'
        });
    }
});

// Actualizar adopción
router.put('/:aid', requireAuth, async (req, res) => {
    try {
        const { aid } = req.params;
        const { status, notes } = req.body;
        
        // Actualización de adopción
        const updatedAdoption = {
            id: aid,
            petName: 'Buddy',
            petType: 'Dog',
            adopter: 'Juan Pérez',
            adoptionDate: '2024-01-15',
            status: status || 'pending',
            notes: notes || ''
        };
        
        res.status(200).json({
            status: 'success',
            message: 'Adopción actualizada exitosamente',
            payload: updatedAdoption
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la adopción'
        });
    }
});

// Eliminar adopción
router.delete('/:aid', requireAuth, async (req, res) => {
    try {
        const { aid } = req.params;
        
        // Eliminación de adopción
        res.status(200).json({
            status: 'success',
            message: `Adopción ${aid} eliminada exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la adopción'
        });
    }
});

// Obtener adopciones por usuario
router.get('/user/:uid', requireAuth, async (req, res) => {
    try {
        const { uid } = req.params;
        
        // Búsqueda de adopciones por usuario
        const userAdoptions = [
            {
                id: 1,
                petName: 'Buddy',
                petType: 'Dog',
                adoptionDate: '2024-01-15',
                status: 'completed'
            }
        ];
        
        res.status(200).json({
            status: 'success',
            payload: userAdoptions
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener adopciones del usuario'
        });
    }
});

export default router;
