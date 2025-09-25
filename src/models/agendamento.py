from datetime import datetime
from src.models.user import db

class Agendamento(db.Model):
    """Modelo para agendamentos de consultas odontológicas"""
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    data = db.Column(db.Date, nullable=False)
    horario = db.Column(db.String(5), nullable=False)  # Formato HH:MM
    servico = db.Column(db.String(50), nullable=False)
    observacoes = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='agendado')  # agendado, confirmado, cancelado
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Converte o objeto para dicionário"""
        return {
            'id': self.id,
            'nome': self.nome,
            'telefone': self.telefone,
            'email': self.email,
            'data': self.data.strftime('%Y-%m-%d') if self.data else None,
            'horario': self.horario,
            'servico': self.servico,
            'observacoes': self.observacoes,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Agendamento {self.nome} - {self.data} {self.horario}>'

