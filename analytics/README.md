# true_tech_hack_2023

%%bash
git clone https://github.com/huggingface/transformers
cd transformers
pip install .


!pip install datasets
!pip install evaluate

!mkdir models/

!wget -O train.txt https://www.dropbox.com/s/oa3v9c7g9bp40xw/train.txt?dl=0
!wget -O valid.txt https://www.dropbox.com/s/mworl3ld6r3bg62/valid.txt?dl=0


!wget https://raw.githubusercontent.com/huggingface/transformers/main/examples/pytorch/language-modeling/run_clm.py


!python run_clm.py \
--model_name_or_path sberbank-ai/rugpt3small_based_on_gpt2 \
--train_file train.txt \
--validation_file valid.txt \
--per_device_train_batch_size 1 \
--per_device_eval_batch_size 1 \
--block_size 2048 \
--dataset_config_name plain_text \
--do_train \
--do_eval \
--output_dir models/essays