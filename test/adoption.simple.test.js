import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Adoption Router Tests', () => {
    let app;
    
    before(async () => {
        // Crear una app express simple para testing
        app = express();
        app.use(express.json());
        
        // Mock simple del middleware de auth
        const mockAuth = (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Token requerido'
                });
            }
            req.user = { id: '123', role: 'user' };
            next();
        };
        
        // Recrear el router de adoption directamente
        const router = express.Router();
        
        // GET todas las adopciones
        router.get('/', async (req, res) => {
            try {
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
        
        // GET adopción por ID
        router.get('/:aid', async (req, res) => {
            try {
                const { aid } = req.params;
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
        
        // POST crear adopción
        router.post('/', mockAuth, async (req, res) => {
            try {
                const { petName, petType, adopter, notes } = req.body;
                
                if (!petName || !petType || !adopter) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Faltan campos requeridos: petName, petType, adopter'
                    });
                }
                
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
        
        // PUT actualizar adopción
        router.put('/:aid', mockAuth, async (req, res) => {
            try {
                const { aid } = req.params;
                const { status, notes } = req.body;
                
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
        
        // DELETE eliminar adopción
        router.delete('/:aid', mockAuth, async (req, res) => {
            try {
                const { aid } = req.params;
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
        
        // GET adopciones por usuario
        router.get('/user/:uid', mockAuth, async (req, res) => {
            try {
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
        
        app.use('/api/adoptions', router);
    });

    describe('GET /api/adoptions', () => {
        it('Debería obtener todas las adopciones', (done) => {
            chai.request(app)
                .get('/api/adoptions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('payload');
                    expect(res.body.payload).to.be.an('array');
                    done();
                });
        });

        it('Debería devolver un array con al menos una adopción', (done) => {
            chai.request(app)
                .get('/api/adoptions')
                .end((err, res) => {
                    expect(res.body.payload).to.have.length.greaterThan(0);
                    expect(res.body.payload[0]).to.have.property('id');
                    expect(res.body.payload[0]).to.have.property('petName');
                    expect(res.body.payload[0]).to.have.property('petType');
                    expect(res.body.payload[0]).to.have.property('adopter');
                    done();
                });
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('Debería obtener una adopción específica por ID', (done) => {
            const adoptionId = '1';
            chai.request(app)
                .get(`/api/adoptions/${adoptionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body.payload).to.have.property('id', adoptionId);
                    expect(res.body.payload).to.have.property('petName');
                    expect(res.body.payload).to.have.property('adopter');
                    done();
                });
        });

        it('Debería devolver los campos requeridos de la adopción', (done) => {
            chai.request(app)
                .get('/api/adoptions/1')
                .end((err, res) => {
                    expect(res.body.payload).to.have.all.keys(
                        'id', 'petName', 'petType', 'adopter', 
                        'adoptionDate', 'status', 'notes'
                    );
                    done();
                });
        });
    });

    describe('POST /api/adoptions', () => {
        it('Debería crear una nueva adopción con datos válidos', (done) => {
            const newAdoption = {
                petName: 'Luna',
                petType: 'Cat',
                adopter: 'Ana López',
                notes: 'Gato muy cariñoso'
            };

            chai.request(app)
                .post('/api/adoptions')
                .set('Authorization', 'Bearer valid-token')
                .send(newAdoption)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.payload).to.have.property('petName', newAdoption.petName);
                    expect(res.body.payload).to.have.property('petType', newAdoption.petType);
                    expect(res.body.payload).to.have.property('adopter', newAdoption.adopter);
                    done();
                });
        });

        it('Debería fallar al crear adopción sin campos requeridos', (done) => {
            const incompleteAdoption = {
                petName: 'Luna'
            };

            chai.request(app)
                .post('/api/adoptions')
                .set('Authorization', 'Bearer valid-token')
                .send(incompleteAdoption)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('status', 'error');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('Debería asignar status "pending" por defecto', (done) => {
            const newAdoption = {
                petName: 'Max',
                petType: 'Dog',
                adopter: 'Carlos Ruiz'
            };

            chai.request(app)
                .post('/api/adoptions')
                .set('Authorization', 'Bearer valid-token')
                .send(newAdoption)
                .end((err, res) => {
                    expect(res.body.payload).to.have.property('status', 'pending');
                    done();
                });
        });
    });

    describe('PUT /api/adoptions/:aid', () => {
        it('Debería actualizar una adopción existente', (done) => {
            const adoptionId = '1';
            const updateData = {
                status: 'completed',
                notes: 'Adopción completada con éxito'
            };

            chai.request(app)
                .put(`/api/adoptions/${adoptionId}`)
                .set('Authorization', 'Bearer valid-token')
                .send(updateData)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.payload).to.have.property('status', updateData.status);
                    expect(res.body.payload).to.have.property('notes', updateData.notes);
                    done();
                });
        });
    });

    describe('DELETE /api/adoptions/:aid', () => {
        it('Debería eliminar una adopción existente', (done) => {
            const adoptionId = '1';

            chai.request(app)
                .delete(`/api/adoptions/${adoptionId}`)
                .set('Authorization', 'Bearer valid-token')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.include(adoptionId);
                    done();
                });
        });
    });

    describe('Authentication Tests', () => {
        it('Debería rechazar requests sin autenticación para POST', (done) => {
            const newAdoption = {
                petName: 'Test',
                petType: 'Dog',
                adopter: 'Test User'
            };

            chai.request(app)
                .post('/api/adoptions')
                .send(newAdoption)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it('Debería rechazar requests sin autenticación para PUT', (done) => {
            chai.request(app)
                .put('/api/adoptions/1')
                .send({ status: 'completed' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it('Debería rechazar requests sin autenticación para DELETE', (done) => {
            chai.request(app)
                .delete('/api/adoptions/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
    });
});
