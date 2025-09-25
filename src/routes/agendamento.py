from flask import Blueprint, request, jsonify
from datetime import datetime, date
from src.models.user import db
from src.models.agendamento import Agendamento

agendamento_bp = Blueprint('agendamento', __name__)

# Horários disponíveis para agendamento (configurável)
HORARIOS_DISPONIVEIS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

@agendamento_bp.route('/api/disponibilidade', methods=['GET'])
def verificar_disponibilidade():
    """Verifica horários disponíveis para uma data específica"""
    try:
        data_str = request.args.get('data')
        if not data_str:
            return jsonify({'error': 'Parâmetro data é obrigatório'}), 400
        
        # Converte string para objeto date
        try:
            data_obj = datetime.strptime(data_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Formato de data inválido. Use YYYY-MM-DD'}), 400
        
        # Busca agendamentos existentes para a data
        agendamentos_existentes = Agendamento.query.filter_by(
            data=data_obj,
            status='agendado'
        ).all()
        
        # Lista horários ocupados
        horarios_ocupados = [ag.horario for ag in agendamentos_existentes]
        
        # Lista horários disponíveis (remove os ocupados)
        horarios_livres = [h for h in HORARIOS_DISPONIVEIS if h not in horarios_ocupados]
        
        return jsonify({
            'data': data_str,
            'horarios_disponiveis': horarios_livres,
            'horarios_ocupados': horarios_ocupados
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@agendamento_bp.route('/api/agendar', methods=['POST'])
def criar_agendamento():
    """Cria um novo agendamento"""
    try:
        dados = request.get_json()
        
        # Validação de campos obrigatórios
        campos_obrigatorios = ['nome', 'telefone', 'data', 'horario', 'servico']
        for campo in campos_obrigatorios:
            if not dados.get(campo):
                return jsonify({'error': f'Campo {campo} é obrigatório'}), 400
        
        # Converte string de data para objeto date
        try:
            data_obj = datetime.strptime(dados['data'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Formato de data inválido. Use YYYY-MM-DD'}), 400
        
        # Verifica se o horário está disponível
        horario = dados['horario']
        if horario not in HORARIOS_DISPONIVEIS:
            return jsonify({'error': 'Horário não está na lista de horários disponíveis'}), 400
        
        # Verifica se já existe agendamento para esta data/horário
        agendamento_existente = Agendamento.query.filter_by(
            data=data_obj,
            horario=horario,
            status='agendado'
        ).first()
        
        if agendamento_existente:
            return jsonify({'error': 'Horário não disponível para esta data'}), 409
        
        # Cria novo agendamento
        novo_agendamento = Agendamento(
            nome=dados['nome'],
            telefone=dados['telefone'],
            email=dados.get('email'),
            data=data_obj,
            horario=horario,
            servico=dados['servico'],
            observacoes=dados.get('observacoes'),
            status='agendado'
        )
        
        # Salva no banco de dados
        db.session.add(novo_agendamento)
        db.session.commit()
        
        # Aqui você pode adicionar integração com WhatsApp para notificação
        # notificar_agendamento_whatsapp(novo_agendamento)
        
        return jsonify({
            'success': True,
            'message': 'Agendamento criado com sucesso',
            'agendamento': novo_agendamento.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@agendamento_bp.route('/api/agendamentos', methods=['GET'])
def listar_agendamentos():
    """Lista todos os agendamentos"""
    try:
        agendamentos = Agendamento.query.order_by(Agendamento.data, Agendamento.horario).all()
        return jsonify({
            'agendamentos': [ag.to_dict() for ag in agendamentos]
        })
    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@agendamento_bp.route('/api/agendamentos/<int:agendamento_id>', methods=['DELETE'])
def cancelar_agendamento(agendamento_id):
    """Cancela um agendamento"""
    try:
        agendamento = Agendamento.query.get_or_404(agendamento_id)
        agendamento.status = 'cancelado'
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Agendamento cancelado com sucesso'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

