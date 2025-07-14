import chai from 'chai';
import chaiHttp from 'chai-http';

// No importamos app para evitar problemas de conexión MongoDB en tests
// En su lugar, crearemos un mock server para testing

chai.use(chaiHttp);
const expect = chai.expect;

describe('Adoption Router Tests', () => {
    let authToken;
    let mockApp;
    
    // Crear una app mock para testing sin MongoDB
    before(async () => {
        // Importar express y crear app mock
        const express = await import('express');
        const adoptionRouter = await import('../routes/adoption.router.js');
        
        mockApp = express.default();
        mockApp.use(express.default.json());
        
        // Mock del middleware de auth que siempre permite el acceso
        mockApp.use((req, res, next) => {
            req.user = { id: '123', role: 'user' };
            next();
        });
        
        mockApp.use('/api/adoptions', adoptionRouter.default);
        
        authToken = 'Bearer mock-jwt-token-for-testing';
    });

    describe('GET /api/adoptions', () => {
        it('Debería obtener todas las adopciones', (done) => {
            chai.request(mockApp)
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
            chai.request(mockApp)
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
            chai.request(mockApp)
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
            chai.request(mockApp)
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
                .set('Authorization', authToken)
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
                // Faltan petType y adopter
            };

            chai.request(app)
                .post('/api/adoptions')
                .set('Authorization', authToken)
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
                .set('Authorization', authToken)
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
                .set('Authorization', authToken)
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

        it('Debería mantener status "pending" si no se proporciona', (done) => {
            const adoptionId = '2';
            const updateData = {
                notes: 'Notas actualizadas'
            };

            chai.request(app)
                .put(`/api/adoptions/${adoptionId}`)
                .set('Authorization', authToken)
                .send(updateData)
                .end((err, res) => {
                    expect(res.body.payload).to.have.property('status', 'pending');
                    done();
                });
        });
    });

    describe('DELETE /api/adoptions/:aid', () => {
        it('Debería eliminar una adopción existente', (done) => {
            const adoptionId = '1';

            chai.request(app)
                .delete(`/api/adoptions/${adoptionId}`)
                .set('Authorization', authToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.include(adoptionId);
                    done();
                });
        });
    });

    describe('GET /api/adoptions/user/:uid', () => {
        it('Debería obtener adopciones de un usuario específico', (done) => {
            const userId = '123';

            chai.request(app)
                .get(`/api/adoptions/user/${userId}`)
                .set('Authorization', authToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 'success');
                    expect(res.body.payload).to.be.an('array');
                    done();
                });
        });

        it('Debería devolver adopciones con la estructura correcta', (done) => {
            chai.request(app)
                .get('/api/adoptions/user/123')
                .set('Authorization', authToken)
                .end((err, res) => {
                    if (res.body.payload.length > 0) {
                        expect(res.body.payload[0]).to.have.property('id');
                        expect(res.body.payload[0]).to.have.property('petName');
                        expect(res.body.payload[0]).to.have.property('petType');
                        expect(res.body.payload[0]).to.have.property('adoptionDate');
                        expect(res.body.payload[0]).to.have.property('status');
                    }
                    done();
                });
        });
    });

    describe('Error Handling', () => {
        it('Debería manejar errores del servidor correctamente', (done) => {
            // Simulamos un error forzando una ruta que cause error
            chai.request(app)
                .get('/api/adoptions/invalid-endpoint-that-causes-error')
                .end((err, res) => {
                    // Dependiendo de cómo maneje la app rutas no encontradas
                    expect(res).to.have.status.oneOf([404, 500]);
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
                    expect(res).to.have.status.oneOf([401, 403]);
                    done();
                });
        });

        it('Debería rechazar requests sin autenticación para PUT', (done) => {
            chai.request(app)
                .put('/api/adoptions/1')
                .send({ status: 'completed' })
                .end((err, res) => {
                    expect(res).to.have.status.oneOf([401, 403]);
                    done();
                });
        });

        it('Debería rechazar requests sin autenticación para DELETE', (done) => {
            chai.request(app)
                .delete('/api/adoptions/1')
                .end((err, res) => {
                    expect(res).to.have.status.oneOf([401, 403]);
                    done();
                });
        });
    });
});
