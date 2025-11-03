"""Torna RA opcional (nullable=True)

Revision ID: d7a811593cc4
Revises: 615c5ddeef07
Create Date: 2025-10-16 15:10:13.861792

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd7a811593cc4'
down_revision: Union[str, Sequence[str], None] = '615c5ddeef07'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    with op.batch_alter_table("students", recreate="always") as batch_op:
        batch_op.alter_column("ra", existing_type=sa.Integer(), nullable=True)

def downgrade():
    with op.batch_alter_table("students", recreate="always") as batch_op:
        batch_op.alter_column("ra", existing_type=sa.Integer(), nullable=False)
