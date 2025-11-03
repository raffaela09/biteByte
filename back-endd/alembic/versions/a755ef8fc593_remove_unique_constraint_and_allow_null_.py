from alembic import op
import sqlalchemy as sa

revision = 'a755ef8fc593'
down_revision = 'd7a811593cc4'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Recria a tabela para remover UNIQUE constraint na coluna ra
    with op.batch_alter_table("students", recreate="always") as batch_op:
        batch_op.alter_column(
            "ra",
            existing_type=sa.String(),
            nullable=True
        )
        # Não precisa recriar índice, UNIQUE é removido na recriação

def downgrade() -> None:
    # Recria a tabela e adiciona UNIQUE novamente
    with op.batch_alter_table("students", recreate="always") as batch_op:
        batch_op.alter_column(
            "ra",
            existing_type=sa.String(),
            nullable=False
        )
        batch_op.create_unique_constraint("uq_students_ra", ["ra"])