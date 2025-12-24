import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const JournalPage = () => {
    const { t } = useTranslation();
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([
        { id: 1, date: new Date().toLocaleDateString(), text: "Today I felt really good about my progress. The AI chat helped me clarify my thoughts." },
        { id: 2, date: new Date(Date.now() - 86400000).toLocaleDateString(), text: "Struggled a bit with anxiety in the morning, but breathing exercises helped." },
    ]);
    const [openExport, setOpenExport] = useState(false);

    const handleSave = () => {
        if (!entry.trim()) return;

        const newEntry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            text: entry
        };

        setEntries([newEntry, ...entries]);
        setEntry('');
        toast.success("Entry saved to journal.");
    };

    const handleDelete = (id) => {
        setEntries(entries.filter(e => e.id !== id));
        toast.info("Entry deleted.");
    };

    const handleExport = () => {
        setOpenExport(true);
    };

    const confirmExport = () => {
        setOpenExport(false);
        toast.success("Journal exported to PDF (Mock)");
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {t('journal')}
                </Typography>
                <Button startIcon={<DownloadIcon />} variant="outlined" onClick={handleExport}>
                    Export
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Editor */}
                <Grid item xs={12} md={7}>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                New Entry
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={10}
                                placeholder="What's on your mind today?"
                                variant="outlined"
                                value={entry}
                                onChange={(e) => setEntry(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                disabled={!entry.trim()}
                            >
                                Save Entry
                            </Button>
                        </Paper>
                    </motion.div>
                </Grid>

                {/* History */}
                <Grid item xs={12} md={5}>
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Typography variant="h6" gutterBottom>
                            Previous Entries
                        </Typography>
                        <Box sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {entries.map((item) => (
                                <Card key={item.id} sx={{ mb: 2, position: 'relative' }}>
                                    <CardContent>
                                        <Typography variant="caption" color="text.secondary">
                                            {item.date}
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                                            {item.text}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Export Dialog */}
            <Dialog
                open={openExport}
                onClose={() => setOpenExport(false)}
            >
                <DialogTitle>Export Journal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to export your journal entries as a PDF file? (This is a meaningful simulation).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenExport(false)}>Cancel</Button>
                    <Button onClick={confirmExport} autoFocus>
                        Export
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default JournalPage;
